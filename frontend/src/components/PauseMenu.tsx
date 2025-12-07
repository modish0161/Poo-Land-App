import React from 'react';
import audioService from '../services/EnhancedAudioService';
import './PauseMenu.css';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
  onSettings?: () => void;
  currentScore: number;
  currentLevel: number;
  timeElapsed: number;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onRestart,
  onQuit,
  onSettings,
  currentScore,
  currentLevel,
  timeElapsed,
}) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResume = () => {
    audioService.playClick();
    onResume();
  };

  const handleRestart = () => {
    audioService.playClick();
    onRestart();
  };

  const handleQuit = () => {
    audioService.playClick();
    onQuit();
  };

  return (
    <div className="pause-overlay">
      <div className="pause-menu card">
        <h2>⏸️ Paused</h2>

        <div className="pause-stats">
          <div className="pause-stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{currentLevel}</span>
          </div>
          <div className="pause-stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{currentScore.toLocaleString()}</span>
          </div>
          <div className="pause-stat">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(timeElapsed)}</span>
          </div>
        </div>

        <div className="pause-actions">
          <button className="btn btn-primary pause-btn" onClick={handleResume}>
            <span className="emoji">▶️</span> Resume
          </button>
          <button className="btn btn-secondary pause-btn" onClick={handleRestart}>
            <span className="emoji">🔄</span> Restart
          </button>
          {onSettings && (
            <button className="btn btn-secondary pause-btn" onClick={onSettings}>
              <span className="emoji">⚙️</span> Settings
            </button>
          )}
          <button className="btn btn-danger pause-btn" onClick={handleQuit}>
            <span className="emoji">🚪</span> Quit
          </button>
        </div>

        <div className="pause-tip">
          <span className="tip-label">💡 Tip:</span>
          <span className="tip-text">Collect power-ups for bonus points!</span>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
