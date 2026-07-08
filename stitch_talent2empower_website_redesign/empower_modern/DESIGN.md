---
name: Empower Modern
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#55433c'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#88726a'
  outline-variant: '#dbc1b8'
  surface-tint: '#9a4621'
  primary: '#9a4621'
  on-primary: '#ffffff'
  primary-container: '#e88258'
  on-primary-container: '#611f00'
  inverse-primary: '#ffb599'
  secondary: '#7f5700'
  on-secondary: '#ffffff'
  secondary-container: '#ffbe4d'
  on-secondary-container: '#724d00'
  tertiary: '#426464'
  on-tertiary: '#ffffff'
  tertiary-container: '#81a4a4'
  on-tertiary-container: '#173a3a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7b2f0b'
  secondary-fixed: '#ffdeae'
  secondary-fixed-dim: '#fcbb4a'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#c5eae9'
  tertiary-fixed-dim: '#a9cdcd'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#2a4c4c'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  surface-cream: '#FDF8F3'
  surface-white: '#FFFFFF'
  accent-warm: '#FFD9B3'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
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
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The brand identity centers on the concept of human potential and professional warmth. It is designed to evoke feelings of optimism, clarity, and approachability, moving away from a traditional corporate aesthetic toward a more "human-centric" professional service model.

The design style utilizes **Modern Minimalism** with **Tactile** accents. It relies on significant white space to reduce cognitive load, combined with high-quality typography and soft geometry. The visual narrative is supported by fluid, dynamic layouts that integrate friendly illustrations as functional storytelling elements rather than static decorations.

## Colors

The palette is anchored by a refined **Copper Orange** (`#E88258`), which serves as the primary action color. This is complemented by a **Golden Ochre** secondary tone to maintain the warmth requested while improving visual hierarchy.

A deep **Forest Teal** is introduced as a tertiary color to provide sophisticated contrast against the warm tones, used primarily for subtle accents or deep-background sections. The foundation of the UI rests on a **Cream** neutral (`#FDF8F3`), which provides a softer, more inviting experience than pure white, reducing eye strain and reinforcing the "warm" brand personality.

## Typography

This design system uses **Epilogue** for headings to project a modern, geometric, yet authoritative presence. Its weights are utilized to create a clear editorial feel. For body text and functional UI elements, **Plus Jakarta Sans** is employed; its soft, rounded terminals echo the brand's friendliness while maintaining high legibility at smaller scales.

Line heights are intentionally generous to improve readability and contribute to the "open" feel of the interface. Display styles use tighter letter spacing for a more "locked-in" professional appearance.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict 8px spacing power-of-two scale is used to ensure mathematical harmony between elements.

Large-scale layouts should utilize asymmetrical spacing to integrate illustrations. For example, text content may occupy 6 columns while an illustration bleeds off the edge of the grid, creating a sense of movement and "empowerment." Content is centered within a maximum container width of 1280px to maintain readability on ultra-wide displays.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Ambient Shadows**. Instead of harsh black shadows, this design system uses shadows tinted with the primary or tertiary colors at very low opacity (3-5%).

- **Surface 0 (Base):** The Cream background (`#FDF8F3`).
- **Surface 1 (Cards):** Pure white (`#FFFFFF`) with a very soft, large-radius shadow (Blur: 24px, Spread: -4px).
- **Surface 2 (Interactive):** Elements that are hovered or active gain a secondary shadow layer to simulate physical lifting.

Avoid heavy borders; use subtle tonal shifts in background color to define distinct content regions.

## Shapes

The shape language is defined by **Rounded** geometry. The 0.5rem (8px) base radius ensures that components feel approachable and "soft" without appearing juvenile.

Buttons and input fields should strictly adhere to the base roundedness. For larger containers like cards or feature sections, use `rounded-xl` (1.5rem) to emphasize the friendly, contemporary aesthetic. Decorative background shapes or illustration containers may use "blob" geometry or full pill shapes to add organic visual interest.

## Components

### Buttons

Primary buttons use the Copper Orange (`#E88258`) with white text and a subtle 8px radius. Secondary buttons should use a Forest Teal outline or a ghost style to prevent visual competition.

### Input Fields

Fields use a white background with a 1px border in a lightened version of the neutral color. Upon focus, the border transitions to the primary orange with a soft glow effect (2px spread).

### Cards

Cards are the primary container for content. They feature a white background, the standard 16px (rounded-lg) radius, and a soft ambient shadow. Padding within cards should be generous (min 24px).

### Chips & Tags

Used for categories or skills. These should use a semi-transparent version of the primary or secondary colors (e.g., 10% opacity) with high-contrast text to ensure accessibility while maintaining the warm palette.

### Progress Indicators

Given the "empowerment" theme, progress bars or steppers should use the secondary Golden Ochre to signify growth and achievement, utilizing rounded caps for all bar elements.
