import React from 'react';
import './ComboDisplay.css';

interface ComboDisplayProps {
  combo: number;
  multiplier: number;
  showAnimation?: boolean;
}

const ComboDisplay: React.FC<ComboDisplayProps> = ({
  combo,
  multiplier,
  showAnimation = false,
}) => {
  if (combo <= 1) return null;

  const getComboTier = () => {
    if (combo >= 20) return 'legendary';
    if (combo >= 15) return 'epic';
    if (combo >= 10) return 'rare';
    if (combo >= 5) return 'good';
    return 'normal';
  };

  const getComboText = () => {
    if (combo >= 20) return 'LEGENDARY!';
    if (combo >= 15) return 'EPIC!';
    if (combo >= 10) return 'AWESOME!';
    if (combo >= 5) return 'GREAT!';
    return 'COMBO!';
  };

  return (
    <div className={`combo-display tier-${getComboTier()} ${showAnimation ? 'animate' : ''}`}>
      <div className="combo-flames">🔥🔥🔥</div>
      <div className="combo-content">
        <span className="combo-count">{combo}</span>
        <span className="combo-label">{getComboText()}</span>
      </div>
      <div className="combo-multiplier">
        <span className="multiplier-value">{multiplier}x</span>
        <span className="multiplier-label">POINTS</span>
      </div>
    </div>
  );
};

export default ComboDisplay;
