import { MAX_POWER_UPS_PER_LEVEL, POWER_UP_CONFIG, POWER_UP_SPAWN_CHANCE, PowerUp, PowerUpType } from '../types/powerup';

/**
 * Generate random power-ups for a level
 */
export function generatePowerUps(
  maze: string[][],
  rows: number,
  cols: number,
  startPos: { x: number; y: number },
  goalPos: { x: number; y: number }
): PowerUp[] {
  const powerUps: PowerUp[] = [];
  
  // Determine how many power-ups to spawn
  if (Math.random() > POWER_UP_SPAWN_CHANCE) {
    return []; // No power-ups this level
  }

  const count = Math.floor(Math.random() * MAX_POWER_UPS_PER_LEVEL) + 1;
  const powerUpTypes: PowerUpType[] = ['speed', 'invincible', 'freeze', 'multiplier'];
  
  // Find all valid spawn positions (not walls, not start, not goal)
  const validPositions: { x: number; y: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] !== '#' && 
          !(x === startPos.x && y === startPos.y) &&
          !(x === goalPos.x && y === goalPos.y)) {
        validPositions.push({ x, y });
      }
    }
  }

  // Randomly select positions and types
  for (let i = 0; i < count && validPositions.length > 0; i++) {
    const posIndex = Math.floor(Math.random() * validPositions.length);
    const position = validPositions[posIndex];
    validPositions.splice(posIndex, 1); // Remove to avoid duplicates

    const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    const config = POWER_UP_CONFIG[type];

    powerUps.push({
      id: `powerup-${i}-${Date.now()}`,
      type,
      position,
      emoji: config.emoji,
      duration: config.duration,
      active: false
    });
  }

  return powerUps;
}

/**
 * Check if player collected a power-up
 */
export function checkPowerUpCollision(
  playerPos: { x: number; y: number },
  powerUps: PowerUp[]
): PowerUp | null {
  for (const powerUp of powerUps) {
    if (!powerUp.active &&
        Math.abs(playerPos.x - powerUp.position.x) < 0.5 &&
        Math.abs(playerPos.y - powerUp.position.y) < 0.5) {
      return powerUp;
    }
  }
  return null;
}

/**
 * Apply power-up effects
 */
export function applyPowerUpEffect(type: PowerUpType): {
  speedMultiplier?: number;
  invincible?: boolean;
  freezeEnemies?: boolean;
  scoreMultiplier?: number;
} {
  switch (type) {
    case 'speed':
      return { speedMultiplier: 2.0 };
    case 'invincible':
      return { invincible: true };
    case 'freeze':
      return { freezeEnemies: true };
    case 'multiplier':
      return { scoreMultiplier: 2.0 };
    default:
      return {};
  }
}
