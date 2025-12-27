
import sys
import os

# Add the project directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.getcwd(), 'backend')))

from app.game import create_new_game

def test_maze_solvability(count=100):
    print(f"🔍 Testing {count} maze generations...")
    success_count = 0
    
    for i in range(count):
        # Test across different levels
        level = (i % 10) + 1
        game = create_new_game(level=level)
        
        if game['optimal_path'] and len(game['optimal_path']) > 0:
            success_count += 1
        else:
            print(f"❌ FAILED: Level {level} maze is unsolvable!")
            
    print(f"\n📊 Results: {success_count}/{count} mazes solved.")
    if success_count == count:
        print("✅ SUCCESS: All generated mazes are solvable!")
        return True
    else:
        print("⚠️ FAILURE: Some mazes were unsolvable.")
        return False

if __name__ == "__main__":
    if test_maze_solvability():
        sys.exit(0)
    else:
        sys.exit(1)
