"""Maze generation and pathfinding algorithms - ported from original Poo game"""
import random
from collections import deque
from typing import List, Tuple, Set, Optional

# Food emojis available in the game
FOOD_EMOJIS = [
    '🌮', '🍕', '🍔', '🍩', '🥨',
    '🍟', '🍰', '🍫', '🍿', '🌯',
    '🥗', '🍣', '🍙', '🍦', '🍭'
]

def generate_random_maze(rows: int, cols: int) -> List[List[str]]:
    """
    Generate a random maze using recursive DFS.
    Returns a 2D list of '#' (walls) or '.' (paths).
    Post-processes to add loops and alternative paths for better gameplay.
    """
    maze = [['#' for _ in range(cols)] for _ in range(rows)]
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    def in_bounds(x: int, y: int) -> bool:
        return 0 <= x < cols and 0 <= y < rows
    
    def carve(x: int, y: int):
        maze[y][x] = '.'
        random.shuffle(directions)
        
        for dx, dy in directions:
            nx, ny = x + 2*dx, y + 2*dy
            if in_bounds(nx, ny) and maze[ny][nx] == '#':
                maze[y + dy][x + dx] = '.'
                carve(nx, ny)
    
    # Start carving from top-left corner
    carve(0, 0)
    
    # IMPORTANT: Remove random walls to create loops and alternative paths
    # This allows players to escape from ghosts more easily
    walls_to_remove = []
    for y in range(1, rows - 1):
        for x in range(1, cols - 1):
            if maze[y][x] == '#':
                # Count adjacent paths
                adjacent_paths = 0
                for dx, dy in directions:
                    nx, ny = x + dx, y + dy
                    if in_bounds(nx, ny) and maze[ny][nx] == '.':
                        adjacent_paths += 1
                
                # If this wall has 2+ adjacent paths, it's a candidate for removal
                if adjacent_paths >= 2:
                    walls_to_remove.append((x, y))
    
    # Remove 25-40% of candidate walls to create multiple paths
    removal_rate = random.uniform(0.25, 0.4)
    walls_to_remove_count = int(len(walls_to_remove) * removal_rate)
    random.shuffle(walls_to_remove)
    
    for i in range(walls_to_remove_count):
        x, y = walls_to_remove[i]
        maze[y][x] = '.'
    
    return maze


def create_maze_grid(maze_layout: List[List[str]]) -> List[List[str]]:
    """
    Convert maze layout to emoji grid.
    Replaces '.' paths with random food emojis.
    """
    rows = len(maze_layout)
    cols = len(maze_layout[0]) if rows > 0 else 0
    
    maze_grid = []
    for y in range(rows):
        row = []
        for x in range(cols):
            if maze_layout[y][x] == '.':
                row.append(random.choice(FOOD_EMOJIS))
            else:
                row.append('#')
        maze_grid.append(row)
    
    return maze_grid


def bfs_path(grid: List[List[str]], start: Tuple[int, int], goal: Tuple[int, int]) -> List[Tuple[int, int]]:
    """
    Return a path of (x,y) tuples from start to goal using BFS.
    '#' cells are walls, everything else is passable.
    """
    rows = len(grid)
    cols = len(grid[0]) if rows > 0 else 0
    sx, sy = start
    gx, gy = goal
    
    # Boundary checks
    if not (0 <= sx < cols and 0 <= sy < rows):
        return []
    if not (0 <= gx < cols and 0 <= gy < rows):
        return []
    if grid[sy][sx] == '#' or grid[gy][gx] == '#':
        return []
    
    queue = deque()
    queue.append((sx, sy, [(sx, sy)]))
    visited = set([(sx, sy)])
    directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]
    
    while queue:
        cx, cy, path = queue.popleft()
        if (cx, cy) == (gx, gy):
            return path
        
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < cols and 0 <= ny < rows:
                if grid[ny][nx] != '#' and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny, path + [(nx, ny)]))
    
    return []


def find_nearest_food(start: Tuple[int, int], foods: Set[Tuple[int, int]], grid: List[List[str]]) -> Optional[Tuple[int, int]]:
    """
    Find the nearest food item from start position using BFS.
    Returns coordinates of nearest food or None if unreachable.
    """
    if not foods:
        return None
    
    rows = len(grid)
    cols = len(grid[0]) if rows > 0 else 0
    sx, sy = start
    
    queue = deque()
    queue.append((sx, sy))
    visited = set([(sx, sy)])
    directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]
    
    while queue:
        cx, cy = queue.popleft()
        if (cx, cy) in foods:
            return (cx, cy)
        
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < cols and 0 <= ny < rows:
                if grid[ny][nx] != '#' and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny))
    
    return None


def build_collector_path(grid: List[List[str]], start: Tuple[int, int], 
                        food_positions: List[Tuple[int, int]], goal: Tuple[int, int]) -> List[Tuple[int, int]]:
    """
    Build a path that visits all food items (greedy nearest-first) then goes to goal.
    Returns list of (x, y) coordinates representing the complete path.
    """
    path = []
    current = start
    leftover_food = set(food_positions)
    
    while leftover_food:
        nearest = find_nearest_food(current, leftover_food, grid)
        if nearest is None:
            return []  # No path to any remaining food
        
        segment = bfs_path(grid, current, nearest)
        if not segment:
            return []
        
        # Avoid duplicating the starting point
        if path:
            segment = segment[1:]
        
        path.extend(segment)
        current = nearest
        leftover_food.remove(nearest)
    
    # Finally go from last food to goal
    final_segment = bfs_path(grid, current, goal)
    if not final_segment:
        return []
    
    if path:
        final_segment = final_segment[1:]
    path.extend(final_segment)
    
    return path


def get_all_food_positions(grid: List[List[str]]) -> List[Tuple[int, int]]:
    """Extract all food positions from the maze grid."""
    food_positions = []
    rows = len(grid)
    cols = len(grid[0]) if rows > 0 else 0
    
    for y in range(rows):
        for x in range(cols):
            if grid[y][x] not in ['#', ' ']:
                food_positions.append((x, y))
    
    return food_positions
