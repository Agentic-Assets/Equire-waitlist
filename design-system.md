# EQUIRE Design System

The visual identity and styling reference for the EQUIRE platform. All design tokens are defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind CSS v4 utility classes via the `@theme inline` directive.

---

## Typography

### Font Families

| Role | Font | Fallback Stack | Tailwind Class |
|---|---|---|---|
| **Primary (sans)** | DM Sans | Geist Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif | `font-sans` |
| **Monospace** | DM Mono | Geist Mono, SF Mono, Monaco, Cascadia Code, Roboto Mono, monospace | `font-mono` |

DM Sans is a geometric sans-serif with a clean, modern feel that reads well at both small UI sizes and larger headings. DM Mono is used for financial figures, tabular data, step indicators, and code.

### Type Scale

| Usage | Size | Weight | Tracking | Example Class |
|---|---|---|---|---|
| Page heading | `text-xl` (1.25rem) | `font-semibold` (600) | `tracking-tight` | Deal Pipeline title |
| Section heading | `text-lg` (1.125rem) | `font-semibold` (600) | default | Stat values |
| Card title | `text-sm` (0.875rem) | `font-semibold` (600) | default | Deal name in sidebar |
| Body text | `text-sm` (0.875rem) | `font-normal` (400) | default | Descriptions, messages |
| Small label | `text-xs` (0.75rem) | `font-medium` (500) | default | Filter labels, metadata |
| Micro label | `text-[10px]` | `font-semibold` (600) | `tracking-wider` | Uppercase category labels |
| Tagline | `text-[12px]` | `font-medium` (500) | `tracking-[0.08em]` | "Deal Intelligence" under logo |

### Typography Rules

- **Tabular data** always uses `tabular-nums` for aligned columns (financial metrics, stats strips)
- **Uppercase micro labels** use `text-[10px] font-semibold tracking-wider uppercase` for category headers
- **Monospace numbers** in step indicators and wizard use `font-mono font-semibold`
- Never hardcode text color utility classes when token-based classes exist (see Colors below)

---

## Color System

EQUIRE uses a dual-theme system (light and dark) with CSS custom properties that switch automatically. All colors are defined in `:root` (light) and `.dark` (dark) blocks.

### Background Colors

| Token | Light | Dark | Tailwind Class | Usage |
|---|---|---|---|---|
| `--background` | `#f5f3ef` (warm cream) | `#0A0E17` (deep navy) | `bg-background` | Page background |
| `--background-alt` | `#faf9f6` (lighter cream) | `#0D1219` (slightly lighter navy) | `bg-bg-alt` | Sidebar, alt sections |
| `--surface` | `#ffffff` (white) | `#111827` (dark slate) | `bg-surface` | Cards, panels, popovers |
| `--surface-light` | `#f0ede8` (warm gray) | `#1A2332` (steel blue) | `bg-surface-light` | Hover states, alt rows |
| `--surface-hover` | `#e8e5e0` (deeper warm gray) | `#1E2A3B` (lighter steel) | `bg-surface-hover` | Active/pressed states |

### Text Colors

| Token | Light | Dark | Tailwind Class | Usage |
|---|---|---|---|---|
| `--text-primary` | `#1a1814` (near black) | `#F1F5F9` (cool white) | `text-text-primary` | Headings, primary content |
| `--text-muted` | `#5a5650` (warm gray) | `#94A3B8` (slate) | `text-text-muted` | Secondary text, descriptions |
| `--text-dim` | `#9a9590` (light gray) | `#64748B` (dim slate) | `text-text-dim` | Timestamps, tertiary info |
| `--foreground` | `#1a1814` | `#F1F5F9` | `text-foreground` | Default body text |

### Accent & Brand Colors

| Token | Light | Dark | Tailwind Class | Usage |
|---|---|---|---|---|
| `--accent` | `#1a3a6b` (navy blue) | `#3B82F6` (bright blue) | `bg-accent` / `text-accent` | Primary actions, active states, links |
| `--accent-foreground` | `#ffffff` | `#ffffff` | `text-accent-foreground` | Text on accent backgrounds |
| `--gold` | `#b8860b` (dark gold) | `#D4A843` (warm gold) | `text-gold` | Financial values, premium indicators |
| `--gold-light` | `#f5e6b8` | `rgba(212,168,67,0.25)` | `bg-gold-light` | Gold pill backgrounds |
| `--gold-bright` | `#d4a017` | `#E5B94D` | — | Accent gold for changed indicators |

### Status Colors

| Token | Light | Dark | Tailwind Class | Usage |
|---|---|---|---|---|
| `--success` | `#1a6b3c` (forest green) | `#34D399` (emerald) | `text-success` | Active deals, positive metrics |
| `--warning` | `#8b4a0a` (amber) | `#F59E0B` (yellow) | `text-warning` | Deadline reminders, caution |
| `--danger` | `#8b1a1a` (crimson) | `#EF4444` (red) | `text-danger` | Errors, destructive actions, critical DD items |
| `--purple` | `#6b3a8b` (deep purple) | `#A78BFA` (lavender) | `text-purple` | Team updates, special categories |
| `--cyan` | `#0a6b8b` (teal) | `#22D3EE` (electric cyan) | `text-cyan` | Informational highlights |

Each status color has a matching `-bg` variant (e.g., `--success-bg`) for subtle background tints.

### Border Colors

| Token | Light | Dark | Tailwind Class | Usage |
|---|---|---|---|---|
| `--border` | `#e2ddd6` (warm beige) | `#1E2D3D` (dark steel) | `border-border` | Default borders |
| `--border-strong` | `#ccc7bf` (darker beige) | `#2E3D4D` (medium steel) | `border-border-strong` | Emphasized borders |
| `--border-active` | `#1a3a6b` (navy) | `#3B82F6` (blue) | `border-border-active` | Focused/active element borders |

### Source Provenance Pills

Data provenance is color-coded throughout the UI:

| Source | Text Color (Light) | Background (Light) | Tailwind Classes |
|---|---|---|---|
| **AI-extracted** | `#1a3a6b` (navy) | `#e8eef8` (light blue) | `text-ai-pill bg-ai-pill-bg` |
| **Fund defaults** | `#5a4a2a` (brown) | `#f5e6b8` (gold tint) | `text-fund-pill bg-fund-pill-bg` |
| **User-entered** | `#2a5a3a` (green) | `#e8f5ee` (green tint) | `text-user-pill bg-user-pill-bg` |

### Scenario Colors

| Scenario | Light | Dark | Tailwind Class |
|---|---|---|---|
| **Base** | `#1a3a6b` (navy) | `#3B82F6` (blue) | `text-scenario-base` |
| **Upside** | `#1a6b3c` (green) | `#34D399` (emerald) | `text-scenario-up` |
| **Downside** | `#8b1a1a` (red) | `#EF4444` (red) | `text-scenario-down` |

---

## Elevation & Shadows

Shadows deepen in dark mode to maintain perceived depth against dark backgrounds.

| Token | Usage | Light Value |
|---|---|---|
| `--shadow-xs` | Subtle depth for inline elements | `0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow-sm` | Cards, panels at rest | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | Elevated cards, dropdowns | `0 4px 6px rgba(0,0,0,0.08)` |
| `--shadow-lg` | Modals, popovers | `0 10px 15px rgba(0,0,0,0.08)` |
| `--shadow-xl` | Top-level overlays | `0 20px 25px rgba(0,0,0,0.1)` |
| `--shadow-card-hover` | Card hover lift effect | `0 8px 25px rgba(0,0,0,0.12)` |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.375rem` (6px) | Small badges, pills |
| `--radius-md` | `0.5rem` (8px) | Buttons, inputs, cards (default `--radius`) |
| `--radius-lg` | `0.75rem` (12px) | Larger cards, panels |
| `--radius-xl` | `1rem` (16px) | Dialogs, prominent containers |
| `--radius-2xl` | `1.5rem` (24px) | Hero elements |
| `--radius-full` | `9999px` | Circular avatars, pill badges |

---

## Animation & Motion

### Duration Scale

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states, button feedback, toggle switches |
| `--duration-normal` | `250ms` | Page transitions, card animations, panel reveals |
| `--duration-slow` | `400ms` | Complex transitions, wizard step changes |
| `--duration-slower` | `600ms` | Large-scale layout shifts |

### Easing Functions

| Token | Curve | Usage |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting view |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Slide-up animations, page enters |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale-in with slight overshoot |
| `--ease-bounce` | `cubic-bezier(0.34, 1.8, 0.64, 1)` | Playful micro-interactions |

### Animation Utilities

| Class | Effect | Easing |
|---|---|---|
| `.animate-fade-in` | Opacity 0 to 1 | `--ease-out`, `--duration-normal` |
| `.animate-slide-up` | Opacity 0 + translateY(8px) to visible | `--ease-out-expo`, `--duration-normal` |
| `.animate-scale-in` | Opacity 0 + scale(0.95) to visible | `--ease-spring`, `--duration-normal` |
| `.card-hover` | Shadow lift + translateY(-2px) on hover | `--ease-out`, `--duration-normal` |
| `.stagger-children` | Sequential slide-up for child elements (50ms interval, up to 8 children) | `--ease-out-expo` |

### Reduced Motion

All animations are disabled when `prefers-reduced-motion: reduce` is active. Elements render at their final state immediately.

---

## Glass Morphism

| Token | Light | Dark |
|---|---|---|
| `--glass-bg` | `rgba(255, 255, 255, 0.7)` | `rgba(17, 24, 39, 0.7)` |
| `--glass-border` | `rgba(255, 255, 255, 0.3)` | `rgba(30, 45, 61, 0.5)` |
| `--glass-blur` | `12px` | `12px` |

Apply with the `.glass` utility class, which sets the background, backdrop-filter blur, and border in one shot.

---

## Layout Patterns

### Sidebar
- Width: `w-60` (240px) fixed
- Background: `bg-background-alt`
- Fixed position on desktop (`md:fixed md:left-0 md:top-0`)
- Logo area: `px-5 py-4` with `<Logo height={26} />` + "Deal Intelligence" tagline

### Page Content
- Padding: `p-4 md:p-8`
- Stats strips use `grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden` for a pixel-border grid effect

### Cards
- Background: `bg-surface`
- Border: `border border-border rounded-lg`
- Hover: `.card-hover` class for lift effect
- Shadow: inline `style={{ boxShadow: "var(--shadow-sm)" }}`

### Popovers & Dropdowns
- Background: `bg-popover/95 backdrop-blur-lg` (frosted glass)
- Shadow: `shadow-lg`
- Border: `border-border`

---

## Icon System

EQUIRE uses **Lucide React** exclusively for all iconography. Icons are rendered at contextually appropriate sizes:

| Context | Size | Example |
|---|---|---|
| Inline with text | `size-3.5` (14px) | Button icons, status indicators |
| Standard UI | `size-4` (16px) | Sidebar nav items, action buttons |
| Empty states | Default (24px) | Empty state illustrations |
| Large empty states | `w-8 h-8` (32px) | Notification empty state |

---

## Component Styling Conventions

### Buttons
- Primary: `bg-accent text-accent-foreground` (navy/blue with white text)
- Outline hover: `hover:bg-accent hover:text-accent-foreground`
- Ghost: `bg-transparent hover:bg-surface-light`
- Small: `size="sm"` with `gap-1.5` for icon + text

### Inputs & Forms
- Border: `border-input` (warm beige / dark steel)
- Focus ring: `ring-ring` (navy / blue)
- Border radius: `--radius` (0.5rem)

### Badges & Pills
- Source pills: rounded with `px-2 py-0.5 text-xs font-medium rounded`
- Status badges: colored background tint with matching text (e.g., `bg-success-bg text-success`)

### Tables
- Header: `bg-surface-light` with `text-[10px] uppercase tracking-wider font-semibold`
- Rows: alternating `bg-surface-light` on even rows
- Borders: `border border-border` on all cells
- Numbers: `font-mono tabular-nums text-right`

---

## Dark Mode Implementation

Theme switching is class-based (`.dark` on `<html>`), not media-query-based. This allows user-controlled toggling via `ThemeToggleSimple`.

- All CSS variables are redefined in the `.dark` block
- The custom variant `@custom-variant dark (&:is(.dark *))` enables Tailwind `dark:` prefix
- Logo swaps between `equire_dark.png` (shown on light backgrounds) and `equire_light.png` (shown on dark backgrounds) via `.logo-light` / `.logo-dark` CSS visibility toggles
- Shadows intensify in dark mode for stronger perceived depth
- Status colors shift from muted/earthy tones (light) to vibrant/saturated tones (dark)

---

## Design Philosophy

**Warm, professional, and data-dense.** EQUIRE's visual language is designed for commercial real estate professionals who spend hours in the platform. The palette avoids sterile blues in favor of warm creams and earthy neutrals in light mode, transitioning to a deep navy foundation in dark mode. Gold accents reinforce the financial/institutional character. The type system favors density and scannability over whitespace — every pixel earns its place on screen.

Key principles:
- **Token-driven**: Every color, shadow, radius, and animation is a reusable token — never hardcode values
- **Theme-aware**: Every UI element must look correct in both light and dark mode
- **Data-first**: Financial data gets monospace, tabular nums, and right-alignment by default
- **Progressive disclosure**: Animations are subtle and purposeful — slide-up for new content, fade for state changes, spring for interactive feedback
- **Accessibility**: Focus rings on all interactive elements, reduced motion support, minimum contrast ratios maintained across both themes
