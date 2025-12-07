"""Game state management and level generation"""
import uuid
from typing import Dict, List, Tuple, Optional
from app.maze import (
    generate_random_maze, 
    create_maze_grid, 
    build_collector_path, 
    get_all_food_positions
)

# Active game sessions in memory (use Redis/database for production)
game_sessions: Dict[str, dict] = {}

# Leaderboard (use database for production)
leaderboard: List[dict] = []


def create_new_game(level: int = 1, rows: int = 15, cols: int = 15) -> dict:
    """
    Create a new game session with specified difficulty.
    Returns game state dictionary.
    """
    game_id = str(uuid.uuid4())
    
    # Scale difficulty based on level
    actual_rows = min(rows + (level - 1) * 2, 25)
    actual_cols = min(cols + (level - 1) * 2, 25)
    
    # Generate maze
    maze_layout = generate_random_maze(actual_rows, actual_cols)
    maze_grid = create_maze_grid(maze_layout)
    
    # Get food positions
    food_positions = get_all_food_positions(maze_grid)
    
    # Calculate optimal path
    start_cell = (0, 0)
    goal_cell = (actual_cols - 1, actual_rows - 1)
    optimal_path = build_collector_path(maze_grid, start_cell, food_positions, goal_cell)
    
    game_state = {
        'id': game_id,
        'level': level,
        'rows': actual_rows,
        'cols': actual_cols,
        'maze_grid': maze_grid,
        'start': start_cell,
        'goal': goal_cell,
        'food_positions': food_positions,
        'optimal_path': optimal_path,
        'foods_collected': 0,
        'total_foods': len(food_positions),
        'score': 0,
        'status': 'active',  # active, completed, failed
        'path_length': len(optimal_path)
    }
    
    game_sessions[game_id] = game_state
    return game_state


def get_game_state(game_id: str) -> Optional[dict]:
    """Retrieve game state by ID."""
    return game_sessions.get(game_id)


def update_game_progress(game_id: str, foods_collected: int, time_elapsed: float) -> dict:
    """
    Update game progress and calculate score.
    Score based on: foods collected, time, and efficiency.
    """
    game = game_sessions.get(game_id)
    if not game:
        return {'error': 'Game not found'}
    
    game['foods_collected'] = foods_collected
    
    # Calculate score
    base_score = foods_collected * 100
    time_bonus = max(0, 10000 - int(time_elapsed * 10))  # Bonus for speed
    level_multiplier = game['level']
    
    game['score'] = (base_score + time_bonus) * level_multiplier
    
    # Check if game is complete
    if foods_collected >= game['total_foods']:
        game['status'] = 'completed'
    
    return game


def complete_game(game_id: str, player_name: str, time_elapsed: float) -> dict:
    """
    Mark game as completed and add to leaderboard.
    """
    game = game_sessions.get(game_id)
    if not game:
        return {'error': 'Game not found'}
    
    game['status'] = 'completed'
    game['completion_time'] = time_elapsed
    
    # Add to leaderboard
    leaderboard_entry = {
        'player_name': player_name,
        'score': game['score'],
        'level': game['level'],
        'time': time_elapsed,
        'foods_collected': game['foods_collected']
    }
    
    leaderboard.append(leaderboard_entry)
    leaderboard.sort(key=lambda x: x['score'], reverse=True)
    
    # Keep top 100
    if len(leaderboard) > 100:
        leaderboard.pop()
    
    return game


def get_leaderboard(limit: int = 10) -> List[dict]:
    """Get top scores from leaderboard."""
    return leaderboard[:limit]


def get_level_config(level: int) -> dict:
    """
    Get maze dimensions for a given level.
    Difficulty increases with level.
    """
    base_size = 15
    max_size = 25
    
    size = min(base_size + (level - 1) * 2, max_size)
    
    return {
        'level': level,
        'rows': size,
        'cols': size,
        'description': f'Level {level} - {size}x{size} maze'
    }
