import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/GameContext';
import './Achievements.css';

const Achievements = () => {
  const navigate = useNavigate();
  const { state } = useGameStore();

  const unlockedCount = state.achievements.filter((a) => a.unlocked).length;
  const totalCount = state.achievements.length;

  return (
    <div className="achievements-screen">
      <div className="achievements-container card">
        <h1>🏆 Achievements</h1>

        <div className="achievements-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {unlockedCount} / {totalCount} Unlocked
          </span>
        </div>

        <div className="achievements-grid">
          {state.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                {achievement.progress !== undefined &&
                  achievement.target &&
                  !achievement.unlocked && (
                    <div className="achievement-progress">
                      <div className="mini-progress-bar">
                        <div
                          className="mini-progress-fill"
                          style={{
                            width: `${Math.min(
                              100,
                              (achievement.progress / achievement.target) * 100,
                            )}%`,
                          }}
                        />
                      </div>
                      <span>
                        {achievement.progress} / {achievement.target}
                      </span>
                    </div>
                  )}
                {achievement.unlocked && achievement.unlockedAt && (
                  <span className="unlock-date">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/')}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default Achievements;
