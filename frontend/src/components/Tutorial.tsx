import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import audioService from '../services/EnhancedAudioService';
import { useGameStore } from '../store/GameContext';
import './Tutorial.css';

interface TutorialStep {
  icon: string;
  title: string;
  description: string;
  tips: string[];
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: '👆',
    title: 'Movement',
    description: 'Click or tap anywhere on the maze to move your character there.',
    tips: [
      'Your character will find the shortest path automatically',
      'Use WASD or Arrow keys on desktop',
      'You can click multiple times to change direction',
    ],
  },
  {
    icon: '🍕',
    title: 'Collect Food',
    description: 'Gather all the food items scattered in the maze to unlock the goal.',
    tips: [
      'Food appears as various emoji throughout the maze',
      'Collect them quickly to build up combos for bonus points',
      'You must collect ALL food before reaching the goal',
    ],
  },
  {
    icon: '👻',
    title: 'Avoid Ghosts',
    description: "Ghosts patrol the maze and will chase you. Don't let them catch you!",
    tips: [
      'Different ghost types have different behaviors',
      'White ghosts chase directly, blue ones patrol',
      'Red ghosts are smart and predict your movement',
    ],
  },
  {
    icon: '⚡',
    title: 'Power-Ups',
    description: 'Collect power-ups to gain special abilities temporarily.',
    tips: [
      '⚡ Speed Boost - Move 2x faster',
      "⭐ Invincibility - Ghosts can't hurt you",
      '❄️ Freeze - Stop all ghosts in place',
      '💰 Multiplier - 2x points for everything',
    ],
  },
  {
    icon: '🔥',
    title: 'Combos',
    description: 'Collect food quickly to build up combo multipliers!',
    tips: [
      'Each quick collection increases your combo',
      'Higher combos mean more points',
      "Don't wait too long or you'll lose your combo",
    ],
  },
  {
    icon: '🏆',
    title: 'Achievements & Progress',
    description: 'Complete challenges to unlock achievements and new characters.',
    tips: [
      'Complete levels quickly for speed achievements',
      'Perfect runs (no damage) earn special rewards',
      'Earn coins to unlock new character skins',
    ],
  },
];

const Tutorial = () => {
  const navigate = useNavigate();
  const { dispatch } = useGameStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    audioService.playClick();
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    audioService.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
    audioService.playWin();
    navigate('/levels');
  };

  const handleSkip = () => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
    navigate('/levels');
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="tutorial-screen">
      <div className="tutorial-container card">
        <div className="tutorial-progress">
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              className={`tutorial-dot ${index === currentStep ? 'active' : ''} ${
                index < currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        <div className="tutorial-content">
          <div className="tutorial-icon">{step.icon}</div>
          <h2>{step.title}</h2>
          <p className="tutorial-description">{step.description}</p>

          <ul className="tutorial-tips">
            {step.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="tutorial-actions">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={currentStep === 0}>
            ← Previous
          </button>

          <button className="btn btn-text" onClick={handleSkip}>
            Skip Tutorial
          </button>

          <button className="btn btn-primary" onClick={handleNext}>
            {currentStep === TUTORIAL_STEPS.length - 1 ? 'Start Playing! 🎮' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
