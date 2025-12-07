// Power-up types and configurations
export type PowerUpType = 'speed' | 'invincible' | 'freeze' | 'multiplier';

export interface PowerUp {
  id: string;
  type: PowerUpType;
  position: { x: number; y: number };
  emoji: string;
  duration: number; // milliseconds
  active: boolean;
  collectedAt?: number;
}

export interface ActivePowerUp {
  type: PowerUpType;
  endsAt: number;
}

// Power-up configuration
export const POWER_UP_CONFIG: Record<PowerUpType, {
  emoji: string;
  duration: number;
  name: string;
  description: string;
  effect: string;
}> = {
  speed: {
    emoji: '⚡',
    duration: 8000, // 8 seconds
    name: 'Speed Boost',
    description: 'Move 2x faster!',
    effect: 'speed_multiplier'
  },
  invincible: {
    emoji: '⭐',
    duration: 10000, // 10 seconds
    name: 'Invincibility',
    description: 'Ghosts cannot hurt you!',
    effect: 'invincibility'
  },
  freeze: {
    emoji: '❄️',
    duration: 5000, // 5 seconds
    name: 'Ghost Freeze',
    description: 'Freeze all ghosts!',
    effect: 'freeze_enemies'
  },
  multiplier: {
    emoji: '💰',
    duration: 15000, // 15 seconds
    name: 'Score Multiplier',
    description: '2x points for everything!',
    effect: 'score_multiplier'
  }
};

// Spawn configuration
export const POWER_UP_SPAWN_CHANCE = 0.25; // 25% chance per level
export const MAX_POWER_UPS_PER_LEVEL = 3;
