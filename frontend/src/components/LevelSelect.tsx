import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import audioService from '../services/EnhancedAudioService';
import { useGameStore } from '../store/GameContext';
import { LEVEL_DEFINITIONS, THEME_CONFIGS } from '../types/extended';
import './LevelSelect.css';

const LevelSelect = () => {
  const navigate = useNavigate();
  const { state } = useGameStore();
  const [selectedWorld, setSelectedWorld] = useState<string>('all');

  // Group levels by theme
  const worlds = [
    { id: 'all', name: 'All Levels', icon: '🌍' },
    { id: 'classic', name: 'Classic', icon: '🏠' },
    { id: 'jungle', name: 'Jungle', icon: '🌴' },
    { id: 'underwater', name: 'Ocean', icon: '🌊' },
    { id: 'space', name: 'Space', icon: '🚀' },
    { id: 'candy', name: 'Candy', icon: '🍭' },
    { id: 'fire', name: 'Volcano', icon: '🌋' },
    { id: 'ice', name: 'Frozen', icon: '❄️' },
  ];

  const levels = LEVEL_DEFINITIONS.filter(
    (level) => selectedWorld === 'all' || level.theme === selectedWorld,
  );

  const handleLevelClick = (level: number) => {
    audioService.playClick();
    navigate(`/game/${level}`);
  };

  const isLevelUnlocked = (level: number) => {
    // First 3 levels always unlocked, rest require completing previous
    return level <= 3 || level <= state.progress.highestLevel + 1;
  };

  return (
    <div className="level-select-screen">
      <div className="container">
        <div className="level-header fade-in">
          <h1>
            <span className="emoji">🎮</span> Select Level
          </h1>
          <div className="header-buttons">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              <span className="emoji">🏠</span> Home
            </button>
          </div>
        </div>

        {/* World Filter */}
        <div className="world-filter">
          {worlds.map((world) => (
            <button
              key={world.id}
              className={`world-btn ${selectedWorld === world.id ? 'active' : ''}`}
              onClick={() => setSelectedWorld(world.id)}
            >
              <span className="world-icon">{world.icon}</span>
              <span className="world-name">{world.name}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className={`progress-fill progress-${Math.round(
                (state.progress.highestLevel / LEVEL_DEFINITIONS.length) * 100,
              )}`}
            />
          </div>
          <span className="progress-text">
            {state.progress.completedLevels?.length || 0} / {LEVEL_DEFINITIONS.length} Completed
          </span>
        </div>

        <div className="levels-grid fade-in">
          {levels.map((levelDef) => {
            const unlocked = isLevelUnlocked(levelDef.level);
            const completed = state.progress.completedLevels?.includes(levelDef.level) || false;
            const fastestTime = state.progress.fastestTimes[levelDef.level];
            const starsEarned = state.progress.starsEarned?.[levelDef.level] || 0;
            const themeConfig = THEME_CONFIGS[levelDef.theme];

            return (
              <div
                key={levelDef.level}
                className={`level-card card theme-${levelDef.theme} ${!unlocked ? 'locked' : ''} ${
                  completed ? 'completed' : ''
                } ${levelDef.isBoss ? 'boss' : ''}`}
                onClick={() => unlocked && handleLevelClick(levelDef.level)}
                role="button"
                tabIndex={unlocked ? 0 : -1}
              >
                {!unlocked && <div className="lock-overlay">🔒</div>}
                {levelDef.isBoss && <div className="boss-badge">👑 BOSS</div>}
                {completed && <div className="completed-overlay">✅</div>}

                <div className="level-number">
                  <span className="level-theme-icon">{themeConfig.goalEmoji}</span>
                  <span>{levelDef.level}</span>
                </div>

                <div className="level-info">
                  <h3 className={completed ? 'strikethrough' : ''}>{levelDef.description}</h3>
                  <p>
                    {levelDef.rows}×{levelDef.cols} • {levelDef.ghostCount} 👻
                  </p>

                  <div className="level-stats">
                    {/* Show earned stars */}
                    {starsEarned > 0 && (
                      <div className="earned-stars">
                        {[1, 2, 3].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= starsEarned ? 'earned' : 'empty'}`}
                          >
                            {star <= starsEarned ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                    )}
                    {fastestTime && (
                      <span className="fastest-time">⏱️ {fastestTime.toFixed(1)}s</span>
                    )}
                  </div>
                </div>

                <div className="difficulty-stars">
                  {Array.from({ length: Math.min(Math.ceil(levelDef.level / 4), 5) }).map(
                    (_, i) => (
                      <span key={i} className="emoji">
                        ⭐
                      </span>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
