# Poo-Land Maze Brand Guide

*Visual Identity Guidelines & Design System*

---

## 1. Brand Overview

**Poo-Land Maze** is a fun, addictive maze puzzle game featuring the lovable 💩 emoji navigating through dynamic mazes to collect delicious snacks. The brand embodies playful humor while maintaining a premium, polished gaming experience.

### Brand Personality
- **Playful** – Fun, lighthearted humor
- **Premium** – High-quality visual design
- **Engaging** – Addictive gameplay loop
- **Accessible** – Easy for all ages

---

## 2. Color Palette

### Primary Colors

| Color | HEX | Usage |
|-------|-----|-------|
| **Gold** | `#FFD700` | Primary brand color, CTAs, highlights, headings |
| **Gold Light** | `#FFED4E` | Glows, hover states, accents |
| **Gold Dark** | `#B8860B` | Gradients, depth, shadows |

### Secondary Colors

| Color | HEX | Usage |
|-------|-----|-------|
| **Brown** | `#8B4513` | Secondary elements, text backgrounds |
| **Brown Light** | `#A0522D` | Trail effects, subtle UI |
| **Brown Dark** | `#3d2414` | Deep backgrounds, contrasts |

### Accent Color

| Color | HEX | Usage |
|-------|-----|-------|
| **Orange** | `#FF6B35` | Special highlights, power-ups |

### Semantic Colors

| Color | HEX | Usage |
|-------|-----|-------|
| **Success** | `#4CAF50` | Win states, progress, completion |
| **Warning** | `#FFC107` | Alerts, time warnings |
| **Danger** | `#F44336` | Fail states, errors, obstacles |

### Background Gradient

```css
background: linear-gradient(135deg, #1a0a0f 0%, #2d1810 100%);
```

---

## 3. Typography

### Font Families

| Type | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | Fredoka One | cursive | Headings, buttons, game titles |
| **Body** | Nunito | sans-serif | Body text, descriptions, UI labels |
| **Emoji** | Segoe UI Emoji | Apple Color Emoji, Noto Color Emoji | Game characters, icons |

### Type Scale

| Level | Size | Weight | Color |
|-------|------|--------|-------|
| **H1** | 2.5-4rem | 700 | Gold (#FFD700) |
| **H2** | 1.5-2.5rem | 700 | Gold (#FFD700) |
| **H3** | 1.2-1.8rem | 700 | Gold (#FFD700) |
| **Body** | 1-1.25rem | 400-600 | Gold Light (#FFED4E) |
| **Button** | 1.1-1.5rem | 700 | Brown Dark (#3d2414) |

### Text Effects

Headings use dramatic glow and shadow effects:

```css
text-shadow: 
  0 0 20px rgba(255, 215, 0, 0.8),
  0 0 40px rgba(255, 215, 0, 0.5),
  0 4px 8px rgba(0, 0, 0, 0.9);
```

---

## 4. UI Components

### Glassmorphism Style

All cards and panels use premium glassmorphism:

```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.125);
border-radius: 24px;
```

### Buttons

**Primary Button (Gold)**
- Gradient: Gold to Gold Dark
- Animated glowing border
- Pulse glow animation
- Hover: Scale up + increased glow

**Secondary Button (Glass)**
- Transparent with glass effects
- Animated gradient border
- Subtle hover glow

### Cards

- Glass background with blur
- Animated golden border glow
- Hover: Lift effect + enhanced glow
- 24px border radius

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

---

## 5. Animation Patterns

### Core Animations

| Name | Duration | Timing | Use Case |
|------|----------|--------|----------|
| **Pulse Glow** | 2s | ease-in-out | Buttons, interactive elements |
| **Float** | 2s | ease-in-out | Food emojis, collectibles |
| **Border Glow** | 3s | linear | Cards, containers |
| **Fade In** | 500ms | ease-out | Page transitions |
| **Slide In Up** | 500ms | ease-out | Modal entries |

### Micro-interactions

- **Button Press**: Scale down to 0.95
- **Card Hover**: Lift -6px + scale 1.02
- **Ripple Effect**: Radial gradient expansion on click

---

## 6. Logo Usage

### Primary Mark
The 💩 emoji serves as the primary visual mark, always rendered in native emoji style.

### Title Treatment
- "Poo-Land" in Fredoka One font
- Golden color with glow effects
- "Maze" as subtitle or tagline addition

### Do's
✅ Use high-resolution emoji rendering  
✅ Maintain glow effects on dark backgrounds  
✅ Keep minimum clear space of 16px around logo  
✅ Use with gold text treatment  

### Don'ts
❌ Stretch or distort the emoji  
❌ Use on light backgrounds without outline  
❌ Remove glow effects in hero contexts  
❌ Overlap with busy backgrounds  

---

## 7. Photography & Assets

### Screenshot Composition
- Show gameplay with maze clearly visible
- Capture the golden glow aesthetic
- Include the 💩 character prominently
- Highlight food emoji collectibles

### Recommended Aspect Ratios
| Platform | Ratio | Resolution |
|----------|-------|------------|
| Desktop Hero | 16:9 | 1920×1080 |
| Feature Graphic | 16:9 | 1024×500 |
| App Icon | 1:1 | 512×512 |
| Portrait Mobile | 9:19 | 393×852 |

---

## 8. Voice & Tone

### Writing Style
- **Playful**: Embrace the humor of the poo theme
- **Exciting**: Build anticipation for gameplay
- **Clear**: Simple, easy-to-understand language
- **Inclusive**: Fun for all ages

### Example Copy

**Tagline Options:**
> "Navigate. Collect. Conquer!"  
> "The stinkiest adventure awaits!"

**Feature Highlight:**
> "10 challenging levels filled with delicious snacks!"

---

*This brand guide ensures consistent visual identity across all Poo-Land Maze marketing materials, from app stores to websites.*
