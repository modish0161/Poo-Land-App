import React from 'react';
import type { PowerUp } from '../types/powerup';
import './PowerUpIndicator.css';

interface PowerUpIndicatorProps {
  activePowerUps: Array<{
    type: PowerUp['type'];
    remainingTime: number;
    maxDuration: number;
  }>;
}

const POWER_UP_INFO: Record<PowerUp['type'], { icon: string; name: string; color: string }> = {
  speed: { icon: '⚡', name: 'Speed Boost', color: '#FFD700' },
  invincible: { icon: '⭐', name: 'Invincible', color: '#FF6B35' },
  freeze: { icon: '❄️', name: 'Freeze', color: '#00CED1' },
  multiplier: { icon: '💰', name: '2x Points', color: '#4CAF50' },
};

const PowerUpIndicator: React.FC<PowerUpIndicatorProps> = ({ activePowerUps }) => {
  if (activePowerUps.length === 0) return null;

  return (
    <div className="power-up-indicator">
      {activePowerUps.map((powerUp, index) => {
        const info = POWER_UP_INFO[powerUp.type];
        const progress = (powerUp.remainingTime / powerUp.maxDuration) * 100;

        return (
          <div
            key={`${powerUp.type}-${index}`}
            className={`power-up-badge ${powerUp.remainingTime < 2000 ? 'expiring' : ''}`}
          >
            <div className="power-up-icon">{info.icon}</div>
            <div className="power-up-details">
              <span className="power-up-name">{info.name}</span>
              <div className="power-up-timer-bar">
                <div
                  className={`power-up-timer-fill color-${powerUp.type} progress-${Math.round(
                    progress,
                  )}`}
                />
              </div>
              <span className="power-up-time">{(powerUp.remainingTime / 1000).toFixed(1)}s</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PowerUpIndicator;
