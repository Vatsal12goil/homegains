# Design Brief: Athletic Bodybuilding App

## Tone & Differentiation
Brutal athletic minimalism — commanding dark interface with electric cyan accents that communicate intensity. No frills, high signal-to-noise. 3D model as hero content, not secondary chrome.

## Color Palette
| Role | OKLCH | Purpose |
|------|-------|---------|
| Primary (Accent) | `0.70 0.25 265` | Electric cyan — CTAs, highlights, active states |
| Secondary | `0.63 0.20 35` | Warm orange — achievements, progress, success states |
| Background | `0.08 0 0` | Deep near-black (99% darkened) |
| Card/Surface | `0.12 0 0` | Elevated black for content sections |
| Foreground | `0.95 0 0` | Off-white for max readability |
| Border | `0.20 0 0` | Subtle dividers, light dark grey |
| Muted | `0.22 0 0` | Secondary text, disabled states |

## Typography
| Layer | Font | Usage |
|-------|------|-------|
| Display | Space Grotesk 600 | Headers, exercise titles, rep counts, day labels |
| Body | DM Sans 400 | Instructions, labels, body copy, form inputs |
| Mono | Geist Mono 400 | Reps/sets logging, numeric displays, code-like data |

## Structural Zones
| Zone | Background | Treatment |
|------|-----------|-----------|
| Header | `--card` | Subtle border-bottom, nav items in `--primary` |
| 3D Canvas | `--background` | Full bleed, breathing room (min 60vh) |
| Sidebar (Nav) | `--card` | Bordered right, category pills in `--muted` |
| Schedule Grid | `--background` | 7-column day grid, cells as `--card` with `--border` |
| Workout Session | `--card` | Elevated card, reps input in monospace, `--primary` CTA |
| Footer | `--muted/40` | Border-top, secondary actions, center-aligned |

## Component Patterns
- **Buttons**: `--primary` on hover gets `shadow-glow-primary`, text stays `--primary-foreground`
- **Cards**: `--card` background, `--border` 1px border, `shadow-card` on hover
- **Input**: `--input` background, `--border` border, focus: `--ring` outline 2px
- **Grid cells**: Clickable cells transition smoothly on hover, highlight in `--card` with `--primary` accent

## Motion
- Button hover: `transition-smooth` (0.3s ease)
- Card entry: `animate-slide-up` (0.3s ease-out)
- Accent focus: `animate-pulse-accent` (2s, subtle breathing)
- Form input: `transition-smooth` on focus

## Spacing & Rhythm
- Base: 8px grid
- Cards/containers: 16px padding
- Section gaps: 24px vertical
- Tight density for exercise library and schedule (no wasted space)

## Signature Detail
Electric cyan glow on interactive focus — subtle `shadow-glow-primary` on buttons and primary CTAs. The accent never rests — it pulses softly on active elements, reinforcing athletic energy.

## Constraints
- Dark mode only — no light theme
- No gradients, no blur, no glassmorphism — industrial clarity
- Sharp corners (0px, 8px radii) except large cards (16px)
- High contrast: text always `--foreground` on any background
- 3D canvas dominates — minimize UI chrome around it
