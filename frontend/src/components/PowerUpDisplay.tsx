import React from 'react';
import { ActivePowerUp, POWER_UP_CONFIG } from '../types/powerup';
import './PowerUpDisplay.css';

interface PowerUpDisplayProps {
  activePowerUps: ActivePowerUp[];
}

const PowerUpDisplay: React.FC<PowerUpDisplayProps> = ({ activePowerUps }) => {
  const now = Date.now();

  return (
    <div className="power-up-display">
      {activePowerUps.map((powerUp, index) => {
        const config = POWER_UP_CONFIG[powerUp.type];
        const timeLeft = Math.max(0, powerUp.endsAt - now);
        const progress = (timeLeft / config.duration) * 100;

        return (
          <div key={`${powerUp.type}-${index}`} className="power-up-item">
            <span className="power-up-emoji">{config.emoji}</span>
            <div className="power-up-info">
              <div className="power-up-name">{config.name}</div>
              <div className="power-up-timer-bar">
                <div 
                  className="power-up-timer-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="power-up-time">{(timeLeft / 1000).toFixed(1)}s</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PowerUpDisplay;
