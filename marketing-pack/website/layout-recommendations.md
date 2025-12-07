# Poo-Land Maze Website Layout Recommendations

*Asset selection and layout guide for the Indigo Pascal game page*

---

## Hero Section

### Recommended Hero Image
Use one of these captured screenshots as the primary hero:
- `desktop/1920x1080/poo-land-maze_desktop_hero_1920x1080.png`
- `desktop/1920x1080/poo-land-maze_desktop_menu_1920x1080.png`

**Hero Treatment:**
- Full-width background with subtle overlay
- Overlay gradient: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(26,10,15,0.9))`
- Add floating 💩 emoji animations (CSS)
- Display tagline: "Navigate. Collect. Conquer!"

### Hero GIF Alternative
Use `gameplay_capture.webp` for a dynamic hero that shows the game in action.

---

## Screenshot Gallery

### Recommended Order (12 images)

| Position | Image | Caption |
|----------|-------|---------|
| 1 | `desktop/1920x1080/poo-land-maze_desktop_menu_1920x1080.png` | Welcome to Poo-Land |
| 2 | `website/manual_gameplay_start_*.png` | Navigate Dynamic Mazes |
| 3 | `desktop/1920x1080/poo-land-maze_desktop_level_select_1920x1080.png` | Choose Your Challenge |
| 4 | `website/manual_tutorial_movement_*.png` | Easy to Learn |
| 5 | `mobile/iphone/portrait/poo-land-maze_mobile_menu_iphone_portrait.png` | Optimized for Mobile |
| 6 | `website/manual_pause_menu_*.png` | Take a Break Anytime |
| 7 | `mobile/pixel/portrait/poo-land-maze_mobile_gameplay_start_pixel_portrait.png` | Play Anywhere |
| 8 | `website/manual_settings_screen_*.png` | Customize Your Experience |
| 9 | `mobile/iphone/landscape/poo-land-maze_mobile_gameplay_iphone_landscape.png` | Landscape Support |
| 10 | `desktop/1440x900/poo-land-maze_desktop_menu_1440x900.png` | Premium Design |
| 11 | `mobile/pixel/landscape/poo-land-maze_mobile_level_select_pixel_landscape.png` | Cross-Device |
| 12 | `desktop/1366x768/poo-land-maze_desktop_hero_1366x768.png` | The Adventure Awaits |

---

## GIF Recommendations

### Landing Page Hero GIF
Use the gameplay recording converted to GIF for an engaging hero section:
- `mp4/` videos → convert to optimized GIF
- Target: 480px width, 15fps, <8MB

### Feature Section GIFs
| Section | GIF Content | Source |
|---------|-------------|--------|
| "Smooth Gameplay" | Menu to level transition | `gameplay_capture.webp` |
| "Dynamic Mazes" | Maze navigation clip | `gameplay_screens.webp` |
| "Mobile Ready" | Touch interactions | Mobile recordings |

---

## Recommended Page Layout

```
┌─────────────────────────────────────────────────┐
│                    NAVBAR                       │
├─────────────────────────────────────────────────┤
│                                                 │
│           HERO SECTION                          │
│   [GIF/Video Background or Screenshot]          │
│                                                 │
│   💩 POO-LAND MAZE                              │
│   "Navigate. Collect. Conquer!"                 │
│                                                 │
│   [PLAY NOW]    [APP STORE] [GOOGLE PLAY]       │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│             FEATURE HIGHLIGHTS                  │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐           │
│   │ 🎮  │  │ 🏆  │  │ ⚡  │  │ 📱  │           │
│   │10 Lv│  │Score│  │60fps│  │Mobile│          │
│   └─────┘  └─────┘  └─────┘  └─────┘           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│              GIF SHOWCASE                       │
│   [Gameplay GIF 1] [Gameplay GIF 2]             │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│            SCREENSHOT GALLERY                   │
│   [Carousel or Grid of 6-12 screenshots]        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│              ABOUT THE GAME                     │
│   [Extended description from store-copy.md]     │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│               DOWNLOAD CTA                      │
│   [PLAY NOW]  [GET ON GOOGLE PLAY]              │
│                                                 │
├─────────────────────────────────────────────────┤
│                    FOOTER                       │
│   © Indigo Pascal | Privacy | Terms             │
└─────────────────────────────────────────────────┘
```

---

## Color Usage on Website

| Element | Color | HEX |
|---------|-------|-----|
| Page Background | Dark gradient | `#1a0a0f` → `#2d1810` |
| Headings | Gold | `#FFD700` |
| Body Text | Gold Light | `#FFED4E` |
| Primary CTA | Gold gradient | `#FFD700` → `#B8860B` |
| Secondary CTA | Glass + Gold border | See tokens.json |
| Cards | Glassmorphism | See brand-guide.md |

---

## Mobile Responsiveness

- Hero image swaps to portrait crop on mobile
- Gallery becomes swipeable carousel
- GIFs auto-pause on low-power mode
- Touch-friendly button sizing (min 48px)

---

## Performance Notes

- Lazy-load gallery images below the fold
- Use WebP format with PNG fallback
- Compress GIFs to <8MB or use MP4 with GIF fallback
- Preload hero image/video
