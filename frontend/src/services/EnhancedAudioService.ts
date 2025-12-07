// Enhanced Audio Service with more sound effects
class AudioService {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private musicEnabled: boolean = true;
  private bgmOscillator: OscillatorNode | null = null;

  constructor() {
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.3;
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }

  private createOscillator(
    type: OscillatorType,
    freq: number,
    duration: number,
    startTime: number = 0,
    volume: number = 0.1,
  ) {
    if (!this.context || !this.masterGain || this.isMuted) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.context.currentTime + startTime);

    gain.gain.setValueAtTime(volume, this.context.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.context.currentTime + startTime);
    osc.stop(this.context.currentTime + startTime + duration);
  }

  // Movement sound
  playMove() {
    if (this.isMuted) return;
    this.createOscillator('sine', 800, 0.05);
  }

  // Food collection
  playEat() {
    if (this.isMuted) return;
    this.createOscillator('square', 1200, 0.1);
    this.createOscillator('sine', 1800, 0.1, 0.05);
  }

  // Combo sound (higher pitch with each combo)
  playCombo(comboCount: number) {
    if (this.isMuted) return;
    const baseFreq = 800 + comboCount * 100;
    this.createOscillator('square', baseFreq, 0.08);
    this.createOscillator('sine', baseFreq * 1.5, 0.08, 0.02);
    if (comboCount >= 5) {
      this.createOscillator('triangle', baseFreq * 2, 0.1, 0.05, 0.15);
    }
  }

  // Power-up collection
  playPowerUp() {
    if (this.isMuted) return;
    this.createOscillator('sine', 523.25, 0.1, 0); // C5
    this.createOscillator('sine', 659.25, 0.1, 0.05); // E5
    this.createOscillator('sine', 783.99, 0.1, 0.1); // G5
    this.createOscillator('triangle', 1046.5, 0.3, 0.15, 0.15); // C6
  }

  // Power-up expired
  playPowerUpEnd() {
    if (this.isMuted) return;
    this.createOscillator('sine', 600, 0.15);
    this.createOscillator('sine', 400, 0.15, 0.1);
    this.createOscillator('sine', 300, 0.2, 0.2);
  }

  // Speed boost active loop
  playSpeedLoop() {
    if (this.isMuted) return;
    this.createOscillator('sawtooth', 100, 0.1, 0, 0.03);
  }

  // Ghost proximity warning
  private lastAlertTime: number = 0;
  playGhostAlert() {
    if (this.isMuted) return;

    const now = Date.now();
    if (now - this.lastAlertTime < 2000) return;

    this.lastAlertTime = now;
    this.createOscillator('sawtooth', 150, 0.3);
    this.createOscillator('sawtooth', 100, 0.3, 0.1);
  }

  // Danger warning (ghost very close)
  playDanger() {
    if (this.isMuted) return;
    this.createOscillator('sawtooth', 200, 0.15);
    this.createOscillator('sawtooth', 250, 0.15, 0.1);
    this.createOscillator('sawtooth', 200, 0.15, 0.2);
  }

  // Taking damage
  playDie() {
    if (this.isMuted) return;
    if (!this.context || !this.masterGain) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.5);

    gain.gain.setValueAtTime(0.2, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.context.currentTime + 0.5);
  }

  // Life lost (not game over)
  playHit() {
    if (this.isMuted) return;
    this.createOscillator('sawtooth', 300, 0.2, 0, 0.15);
    this.createOscillator('square', 150, 0.3, 0.1, 0.1);
  }

  // Ghost frozen
  playFreeze() {
    if (this.isMuted) return;
    this.createOscillator('sine', 1000, 0.2);
    this.createOscillator('triangle', 800, 0.3, 0.1, 0.15);
    this.createOscillator('sine', 1200, 0.2, 0.2);
  }

  // Level complete
  playWin() {
    if (this.isMuted) return;
    this.createOscillator('square', 523.25, 0.1, 0); // C5
    this.createOscillator('square', 659.25, 0.1, 0.1); // E5
    this.createOscillator('square', 783.99, 0.1, 0.2); // G5
    this.createOscillator('square', 1046.5, 0.4, 0.3); // C6
    this.createOscillator('triangle', 1318.51, 0.4, 0.4, 0.15); // E6
  }

  // Achievement unlocked
  playAchievement() {
    if (this.isMuted) return;
    this.createOscillator('sine', 659.25, 0.15, 0); // E5
    this.createOscillator('sine', 783.99, 0.15, 0.1); // G5
    this.createOscillator('sine', 987.77, 0.15, 0.2); // B5
    this.createOscillator('triangle', 1318.51, 0.5, 0.3, 0.2); // E6
  }

  // Button click
  playClick() {
    if (this.isMuted) return;
    this.createOscillator('sine', 600, 0.03);
  }

  // Level start
  playLevelStart() {
    if (this.isMuted) return;
    this.createOscillator('sine', 400, 0.1, 0);
    this.createOscillator('sine', 500, 0.1, 0.1);
    this.createOscillator('sine', 600, 0.15, 0.2);
  }

  // Countdown beep
  playCountdown(final: boolean = false) {
    if (this.isMuted) return;
    if (final) {
      this.createOscillator('square', 880, 0.2, 0, 0.15);
    } else {
      this.createOscillator('sine', 440, 0.15);
    }
  }

  // Invincibility sound effect
  playInvincible() {
    if (this.isMuted) return;
    this.createOscillator('triangle', 800, 0.1, 0, 0.05);
    this.createOscillator('triangle', 1000, 0.1, 0.05, 0.05);
  }

  // Score multiplier active
  playMultiplier() {
    if (this.isMuted) return;
    this.createOscillator('sine', 600, 0.1, 0, 0.08);
    this.createOscillator('sine', 900, 0.1, 0.05, 0.08);
  }

  // Level complete (alias for playWin)
  playLevelComplete() {
    this.playWin();
  }

  // Game over sound
  playGameOver() {
    if (this.isMuted) return;
    this.createOscillator('sawtooth', 300, 0.2, 0, 0.15);
    this.createOscillator('sawtooth', 250, 0.2, 0.15, 0.15);
    this.createOscillator('sawtooth', 200, 0.3, 0.3, 0.12);
    this.createOscillator('sine', 100, 0.5, 0.45, 0.1);
  }

  // Background Music placeholder
  playBGM() {
    if (this.isMuted || !this.musicEnabled) return;
    // Future: Implement looping background music
  }

  stopBGM() {
    if (this.bgmOscillator) {
      this.bgmOscillator.stop();
      this.bgmOscillator = null;
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled) {
      this.stopBGM();
    }
    return this.musicEnabled;
  }

  setVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  resume() {
    if (this.context?.state === 'suspended') {
      this.context.resume();
    }
  }

  isSoundMuted(): boolean {
    return this.isMuted;
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  // Haptic feedback (for mobile)
  vibrate(pattern: number | number[] = 50) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  // Combined feedback
  playHitFeedback() {
    this.playHit();
    this.vibrate([100, 50, 100]);
  }

  playCollectFeedback() {
    this.playEat();
    this.vibrate(30);
  }

  playWinFeedback() {
    this.playWin();
    this.vibrate([100, 50, 100, 50, 200]);
  }
}

export default new AudioService();
