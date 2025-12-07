class AudioService {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.3; // Master volume
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }

  private createOscillator(type: OscillatorType, freq: number, duration: number, startTime: number = 0) {
    if (!this.context || !this.masterGain) return;
    
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.context.currentTime + startTime);
    
    gain.gain.setValueAtTime(0.1, this.context.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(this.context.currentTime + startTime);
    osc.stop(this.context.currentTime + startTime + duration);
  }

  playMove() {
    if (this.isMuted) return;
    // Short high blip
    this.createOscillator('sine', 800, 0.05);
  }

  playEat() {
    if (this.isMuted) return;
    // Satisfying "coin" sound
    this.createOscillator('square', 1200, 0.1);
    this.createOscillator('sine', 1800, 0.1, 0.05);
  }

  private lastAlertTime: number = 0;

  playGhostAlert() {
    if (this.isMuted) return;
    
    const now = Date.now();
    if (now - this.lastAlertTime < 2000) return; // Max once per 2 seconds
    
    this.lastAlertTime = now;
    // Low warning buzz
    this.createOscillator('sawtooth', 150, 0.3);
    this.createOscillator('sawtooth', 100, 0.3, 0.1); // Added depth
  }

  playDie() {
    if (this.isMuted) return;
    // Descending slide
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

  playWin() {
    if (this.isMuted) return;
    // Ascending arpeggio
    this.createOscillator('square', 523.25, 0.1, 0);   // C5
    this.createOscillator('square', 659.25, 0.1, 0.1); // E5
    this.createOscillator('square', 783.99, 0.1, 0.2); // G5
    this.createOscillator('square', 1046.50, 0.4, 0.3); // C6
  }

  playBGM() {
      // Placeholder for BGM - Web Audio API loops can be complex.
      // For now, we'll just log it or play a very sparse ambient drone if desired.
      // A simple drone:
      if (this.isMuted) return;
      // this.createOscillator('sine', 55, 2.0); // Low drone
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
  
  resume() {
      if (this.context?.state === 'suspended') {
          this.context.resume();
      }
  }
}

export default new AudioService();
