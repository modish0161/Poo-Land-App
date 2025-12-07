// Visual effects and animation utilities

export interface ScreenShake {
  intensity: number;
  duration: number;
  startTime: number;
}

export interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

export interface Trail {
  x: number;
  y: number;
  life: number;
  color: string;
  size: number;
}

export interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
  life: number;
  vy: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  type?: 'circle' | 'star' | 'sparkle';
}

// Colors for effects
const CONFETTI_COLORS = ['#FFD700', '#FF6B35', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];
const COMBO_COLORS = ['#FFD700', '#FF9500', '#FF6B00', '#FF3D00', '#FF0000'];

// Create screen shake effect
export function createScreenShake(intensity: number = 10, duration: number = 300): ScreenShake {
  return {
    intensity,
    duration,
    startTime: Date.now(),
  };
}

// Apply screen shake to canvas context
export function applyScreenShake(
  ctx: CanvasRenderingContext2D,
  shake: ScreenShake | null,
): boolean {
  if (!shake) return false;

  const elapsed = Date.now() - shake.startTime;
  if (elapsed > shake.duration) return false;

  const progress = 1 - elapsed / shake.duration;
  const currentIntensity = shake.intensity * progress;

  const offsetX = (Math.random() - 0.5) * currentIntensity * 2;
  const offsetY = (Math.random() - 0.5) * currentIntensity * 2;

  ctx.translate(offsetX, offsetY);
  return true;
}

// Create confetti burst
export function createConfetti(x: number, y: number, count: number = 50): Confetti[] {
  const confetti: Confetti[] = [];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 8;

    confetti.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      life: 1.0,
    });
  }

  return confetti;
}

// Update confetti
export function updateConfetti(confetti: Confetti[]): Confetti[] {
  return confetti
    .map((c) => ({
      ...c,
      x: c.x + c.vx,
      y: c.y + c.vy,
      vy: c.vy + 0.2, // gravity
      vx: c.vx * 0.99, // air resistance
      rotation: c.rotation + c.rotationSpeed,
      life: c.life - 0.015,
    }))
    .filter((c) => c.life > 0);
}

// Draw confetti
export function drawConfetti(ctx: CanvasRenderingContext2D, confetti: Confetti[]) {
  confetti.forEach((c) => {
    ctx.save();
    ctx.globalAlpha = c.life;
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rotation);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
    ctx.restore();
  });
}

// Create particles (for food collection, damage, etc.)
export function createParticles(
  x: number,
  y: number,
  color: string,
  count: number = 10,
  type: 'circle' | 'star' | 'sparkle' = 'circle',
): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      color,
      size: 2 + Math.random() * 4,
      type,
    });
  }

  return particles;
}

// Update particles
export function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vx: p.vx * 0.95,
      vy: p.vy * 0.95,
      life: p.life - 0.025,
      size: p.size * 0.97,
    }))
    .filter((p) => p.life > 0 && p.size > 0.5);
}

// Draw particles
export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;

    if (p.type === 'star') {
      drawStar(ctx, p.x, p.y, p.size, 5);
    } else if (p.type === 'sparkle') {
      drawSparkle(ctx, p.x, p.y, p.size);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1.0;
}

// Draw a star shape
function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  points: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const radius = i % 2 === 0 ? size : size / 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

// Draw a sparkle shape
function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size * 0.3, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size * 0.3, y);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x, y + size * 0.3);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y - size * 0.3);
  ctx.closePath();
  ctx.fill();
}

// Create floating text (for combo, score, etc.)
export function createFloatingText(
  x: number,
  y: number,
  text: string,
  color: string = '#FFD700',
  fontSize: number = 20,
): FloatingText {
  return {
    x,
    y,
    text,
    color,
    fontSize,
    life: 1.0,
    vy: -2,
  };
}

// Update floating texts
export function updateFloatingTexts(texts: FloatingText[]): FloatingText[] {
  return texts
    .map((t) => ({
      ...t,
      y: t.y + t.vy,
      vy: t.vy * 0.98,
      life: t.life - 0.02,
    }))
    .filter((t) => t.life > 0);
}

// Draw floating texts
export function drawFloatingTexts(ctx: CanvasRenderingContext2D, texts: FloatingText[]) {
  texts.forEach((t) => {
    ctx.globalAlpha = t.life;
    ctx.font = `bold ${t.fontSize}px "Fredoka One", cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(t.text, t.x + 2, t.y + 2);

    // Text
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
  });
  ctx.globalAlpha = 1.0;
}

// Create trail effect
export function createTrail(x: number, y: number, color: string, size: number = 10): Trail {
  return {
    x,
    y,
    life: 1.0,
    color,
    size,
  };
}

// Update trails
export function updateTrails(trails: Trail[]): Trail[] {
  return trails
    .map((t) => ({
      ...t,
      life: t.life - 0.05,
      size: t.size * 0.95,
    }))
    .filter((t) => t.life > 0);
}

// Draw trails
export function drawTrails(ctx: CanvasRenderingContext2D, trails: Trail[]) {
  trails.forEach((t) => {
    ctx.globalAlpha = t.life * 0.5;
    ctx.fillStyle = t.color;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1.0;
}

// Rainbow color generator
export function getRainbowColor(time: number): string {
  const hue = (time / 20) % 360;
  return `hsl(${hue}, 100%, 50%)`;
}

// Get combo color based on count
export function getComboColor(comboCount: number): string {
  const index = Math.min(comboCount - 1, COMBO_COLORS.length - 1);
  return COMBO_COLORS[Math.max(0, index)];
}

// Pulse effect value (0-1)
export function getPulse(frequency: number = 1): number {
  return (Math.sin(Date.now() / (1000 / frequency)) + 1) / 2;
}

// Glow effect
export function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  intensity: number = 1,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, color.replace(')', `, ${0.5 * intensity})`).replace('rgb', 'rgba'));
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Draw power-up aura
export function drawPowerUpAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  type: 'speed' | 'invincible' | 'freeze' | 'multiplier',
) {
  const colors: Record<string, string> = {
    speed: 'rgba(255, 255, 0, 0.3)',
    invincible: 'rgba(255, 215, 0, 0.4)',
    freeze: 'rgba(100, 200, 255, 0.3)',
    multiplier: 'rgba(255, 100, 255, 0.3)',
  };

  const pulse = getPulse(2);
  const currentRadius = radius * (0.8 + pulse * 0.4);

  ctx.beginPath();
  ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
  ctx.fillStyle = colors[type];
  ctx.fill();
}

// Level transition animation
export interface LevelTransition {
  active: boolean;
  progress: number;
  type: 'in' | 'out';
  startTime: number;
  duration: number;
}

export function createLevelTransition(type: 'in' | 'out', duration: number = 500): LevelTransition {
  return {
    active: true,
    progress: type === 'in' ? 1 : 0,
    type,
    startTime: Date.now(),
    duration,
  };
}

export function updateLevelTransition(transition: LevelTransition): LevelTransition {
  const elapsed = Date.now() - transition.startTime;
  const progress = Math.min(1, elapsed / transition.duration);

  return {
    ...transition,
    progress: transition.type === 'in' ? 1 - progress : progress,
    active: progress < 1,
  };
}

export function drawLevelTransition(
  ctx: CanvasRenderingContext2D,
  transition: LevelTransition,
  width: number,
  height: number,
) {
  if (!transition.active && transition.type === 'in') return;

  ctx.fillStyle = `rgba(0, 0, 0, ${transition.progress})`;
  ctx.fillRect(0, 0, width, height);
}
