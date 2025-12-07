import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import audioService from '../services/EnhancedAudioService';
import './GameResult.css';

interface GameResultProps {
  type: 'win' | 'lose';
  score: number;
  level: number;
  timeElapsed: number;
  coinsCollected: number;
  powerUpsUsed: number;
  ghostsEaten?: number;
  comboMax?: number;
  isNewHighScore?: boolean;
  onRestart: () => void;
  onNextLevel?: () => void;
  onQuit: () => void;
}

const GameResult: React.FC<GameResultProps> = ({
  type,
  score,
  level,
  timeElapsed,
  coinsCollected,
  powerUpsUsed,
  ghostsEaten = 0,
  comboMax = 1,
  isNewHighScore = false,
  onRestart,
  onNextLevel,
  onQuit,
}) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (type === 'win') {
      audioService.playLevelComplete();
      setShowConfetti(true);
    } else {
      audioService.playGameOver();
    }

    // Animate score counting
    const duration = 1500;
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [type, score]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNextLevel = () => {
    audioService.playClick();
    if (onNextLevel) {
      onNextLevel();
    } else {
      navigate(`/game/${level + 1}`);
    }
  };

  const handleRestart = () => {
    audioService.playClick();
    onRestart();
  };

  const handleQuit = () => {
    audioService.playClick();
    onQuit();
  };

  const stats = [
    { icon: '⏱️', label: 'Time', value: formatTime(timeElapsed) },
    { icon: '🪙', label: 'Coins', value: coinsCollected.toString() },
    { icon: '⚡', label: 'Power-ups', value: powerUpsUsed.toString() },
    { icon: '👻', label: 'Ghosts Eaten', value: ghostsEaten.toString() },
    { icon: '🔥', label: 'Max Combo', value: `${comboMax}x` },
  ];

  return (
    <div className={`game-result-overlay ${type}`}>
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={
                {
                  '--delay': `${Math.random() * 2}s`,
                  '--x': `${Math.random() * 100}vw`,
                  '--color': ['#FFD700', '#FF6B35', '#4CAF50', '#00CED1', '#FF69B4'][
                    Math.floor(Math.random() * 5)
                  ],
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className={`game-result-modal card ${type}`}>
        <div className="result-header">
          {type === 'win' ? (
            <>
              <h1 className="win-title">🎉 Level Complete! 🎉</h1>
              <p className="win-subtitle">Congratulations!</p>
            </>
          ) : (
            <>
              <h1 className="lose-title">💀 Game Over 💀</h1>
              <p className="lose-subtitle">Better luck next time!</p>
            </>
          )}
        </div>

        <div className="result-level">Level {level}</div>

        <div className="result-score-section">
          {isNewHighScore && <div className="new-high-score">🏆 New High Score! 🏆</div>}
          <div className="result-score">
            <span className="score-label">Score</span>
            <span className="score-value">{animatedScore.toLocaleString()}</span>
          </div>
        </div>

        <div className="result-stats">
          {stats.map((stat, index) => (
            <div key={index} className="result-stat">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Star Rating for wins */}
        {type === 'win' && (
          <div className="star-rating">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`star ${star <= Math.min(3, Math.ceil(score / 1000)) ? 'earned' : ''}`}
              >
                ⭐
              </span>
            ))}
          </div>
        )}

        <div className="result-actions">
          {type === 'win' && (
            <button className="btn btn-primary result-btn" onClick={handleNextLevel}>
              <span className="emoji">➡️</span> Next Level
            </button>
          )}
          <button
            className={`btn ${type === 'win' ? 'btn-secondary' : 'btn-primary'} result-btn`}
            onClick={handleRestart}
          >
            <span className="emoji">🔄</span> {type === 'win' ? 'Replay' : 'Try Again'}
          </button>
          <button className="btn btn-secondary result-btn" onClick={handleQuit}>
            <span className="emoji">🏠</span> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
