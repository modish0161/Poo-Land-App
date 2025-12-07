import React from 'react';
import './LivesDisplay.css';

interface LivesDisplayProps {
  lives: number;
  maxLives: number;
  isInvincible?: boolean;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives, maxLives, isInvincible = false }) => {
  return (
    <div className={`lives-display ${isInvincible ? 'invincible' : ''}`}>
      <div className="lives-hearts">
        {Array.from({ length: maxLives }).map((_, index) => (
          <span
            key={index}
            className={`heart ${index < lives ? 'full' : 'empty'} ${
              index === lives - 1 && lives === 1 ? 'last' : ''
            }`}
          >
            {index < lives ? '❤️' : '🖤'}
          </span>
        ))}
      </div>
      {isInvincible && <span className="invincible-badge">⭐ INVINCIBLE</span>}
    </div>
  );
};

export default LivesDisplay;
