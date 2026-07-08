---
name: Vibrant Kinetic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3a4a46'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6a7b76'
  outline-variant: '#b9cac4'
  surface-tint: '#006b5b'
  primary: '#006b5b'
  on-primary: '#ffffff'
  primary-container: '#00f5d4'
  on-primary-container: '#006c5c'
  inverse-primary: '#00dfc1'
  secondary: '#a33800'
  on-secondary: '#ffffff'
  secondary-container: '#cd4800'
  on-secondary-container: '#fffbff'
  tertiary: '#7212ff'
  on-tertiary: '#ffffff'
  tertiary-container: '#e2d3ff'
  on-tertiary-container: '#7316ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#26fedc'
  primary-fixed-dim: '#00dfc1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#802a00'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system moves away from heritage tones toward a high-energy, "sporty-professional" aesthetic. It targets an active, forward-thinking audience that values momentum, clarity, and enthusiasm. The UI should evoke a sense of "controlled kinetic energy"—organized and systematic, yet bursting with life.

The style is **Modern High-Contrast**. It utilizes expansive white space to let vibrant primary accents pop, paired with sharp, intentional typography. It borrows the cleanliness of Corporate Modernism but injects the raw energy of athletic branding through saturated colors and bold type weights. The emotional response should be one of readiness, optimism, and high-performance reliability.

## Colors

The palette is anchored by **Electric Teal** (#00F5D4), providing a fresh, digital-first energy that feels both modern and athletic. **Kinetic Orange** (#FF5C00) serves as the high-action secondary color, reserved for critical calls to action and energetic highlights. **Deep Violet** (#7000FF) provides depth and a premium "tech" feel for tertiary elements.

The foundation is built on a **Slate Neutral** palette. Backgrounds remain crisp white or very light cool grays to maintain professional clarity, while the deep slate ensures high-contrast legibility for text. This combination avoids "muddy" or "earthy" tones, favoring the "happy" and "active" spectrum.

## Typography

The typography leverages **Epilogue** for all headlines, utilizing heavy weights (700-800) and tight letter-spacing to create an impactful, editorial presence. This "loud" headline style is balanced by **Plus Jakarta Sans** for body copy, which offers a soft, welcoming, and highly legible counterpoint.

To lean into the technical and sporty aspect of the design system, **JetBrains Mono** is used for labels, captions, and data points. This monospaced addition adds a layer of precision and modern "pro" utility to the interface. Headlines should use "Optical" kerning where possible to ensure the tight spacing feels intentional and high-end.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a strict 8px base unit.

- **Desktop:** A 12-column grid with generous 40px outer margins to create a "contained yet airy" professional feel.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing should be used aggressively to separate sections, creating "islands" of content that emphasize the vibrant color accents. Horizontal rhythm is maintained through 24px gutters, ensuring that even dense data-heavy layouts feel organized and athletic rather than cluttered.

## Elevation & Depth

This design system uses **Tonal Layers** and **Low-Contrast Outlines** rather than traditional heavy shadows. Depth is achieved through subtle color shifts in the background (e.g., a white card on a light-teal-tinted background).

Where elevation is required for interactivity, use **Ambient Shadows**: extremely soft, high-blur (20px-40px), low-opacity (4-6%) shadows tinted with the Primary or Neutral color. This avoids a "heavy" look, keeping the UI feeling light, fast, and modern. Surface containers should use a 1px border of a slightly darker neutral tint to maintain structural definition without adding visual weight.

## Shapes

The shape language is **Rounded**, using a 0.5rem (8px) base radius. This strikes the balance between the precision of "sharp" professional tools and the approachability of "friendly" consumer apps.

- **Interactive Elements:** (Buttons, Inputs) Use the base 8px radius.
- **Large Containers:** (Cards, Modals) Scale up to 1rem (16px) or 1.5rem (24px) for a more modern, lifestyle-focused feel.
- **Data Visuals:** Icons and small badges should maintain consistent corner radii to reinforce the systematic nature of the design system.

## Components

- **Buttons:** Primary buttons use the Secondary Orange with white text for maximum energy. Secondary buttons use a thick 2px outline of the Primary Teal.
- **Chips:** Highly saturated backgrounds with dark text. Use the label-sm (Monospaced) font for a "pro-gear" aesthetic.
- **Input Fields:** Use 1px Slate borders that transition to a 2px Primary Teal border on focus. No inner shadows; keep them flat and crisp.
- **Cards:** White backgrounds with a subtle 1px border. On hover, apply an Ambient Shadow and a slight upward vertical translation (2px) to simulate "energy."
- **Lists:** Use JetBrains Mono for metadata or timestamps within lists to emphasize precision.
- **Progress Indicators:** Always use the Primary Teal for active states, signifying "go" and "positive momentum."
- **Checkboxes/Radios:** Large-scale (20px-24px) with high-contrast checkmarks using the Primary color.
