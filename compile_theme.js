// Generates src/styles/theme.css — the site-wide DARK sub-brand (navy/blue,
// glassmorphism) shared by every page, matching the Watersport & Turn Fotografie
// design. Fonts: Anybody (display/headline), Hanken Grotesk (body), JetBrains
// Mono (labels). Run: npm run theme
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('./src/styles/theme.css', import.meta.url));

const ANYBODY = '"Anybody", sans-serif';
const HANKEN = '"Hanken Grotesk", sans-serif';
const MONO = '"JetBrains Mono", monospace';

const config = {
  colors: {
    primary: '#aec6ff',
    'on-primary': '#002e6a',
    'primary-container': '#4f8eff',
    'on-primary-container': '#00275e',
    'primary-fixed': '#d8e2ff',
    'primary-fixed-dim': '#aec6ff',
    'on-primary-fixed': '#001a42',
    'on-primary-fixed-variant': '#004396',
    'inverse-primary': '#005ac4',
    secondary: '#ddfcff',
    'on-secondary': '#00363a',
    'secondary-container': '#00f1fe',
    'on-secondary-container': '#006a70',
    'secondary-fixed': '#74f5ff',
    'secondary-fixed-dim': '#00dbe7',
    'on-secondary-fixed': '#002022',
    'on-secondary-fixed-variant': '#004f54',
    tertiary: '#ffb4a2',
    'on-tertiary': '#621100',
    'tertiary-container': '#ff562c',
    'on-tertiary-container': '#560e00',
    'tertiary-fixed': '#ffdad2',
    'tertiary-fixed-dim': '#ffb4a2',
    'on-tertiary-fixed': '#3c0700',
    'on-tertiary-fixed-variant': '#8a1d00',
    error: '#ffb4ab',
    'on-error': '#690005',
    'error-container': '#93000a',
    'on-error-container': '#ffdad6',
    surface: '#111318',
    'surface-dim': '#0a0c10',
    'surface-bright': '#37393e',
    'surface-container-lowest': '#0c0e12',
    'surface-container-low': '#1a1c20',
    'surface-container': '#1e2024',
    'surface-container-high': '#282a2e',
    'surface-container-highest': '#333539',
    'surface-variant': '#333539',
    'on-surface': '#e2e2e8',
    'on-surface-variant': '#c1c6d7',
    'inverse-surface': '#e2e2e8',
    'inverse-on-surface': '#2f3035',
    outline: '#8b90a1',
    'outline-variant': '#414755',
    'surface-tint': '#aec6ff',
    background: '#111318',
    'on-background': '#e2e2e8',
    // Legacy aliases from the old light theme — mapped to dark so any stray usage
    // still renders on-brand (page markup should prefer the tokens above).
    'surface-cream': '#0a0c10',
    'surface-white': '#0c0e12',
    'accent-warm': '#4f8eff',
  },
  borderRadius: {
    DEFAULT: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  spacing: {
    'margin-mobile': '16px',
    'margin-desktop': '64px',
    gutter: '24px',
    base: '8px',
    'container-max': '1440px',
    'stack-sm': '12px',
    'stack-md': '24px',
    'stack-lg': '48px',
  },
  fontFamily: {
    body: HANKEN,
    'display-xl': ANYBODY,
    'display-lg': ANYBODY,
    'display-lg-mobile': ANYBODY,
    'headline-xl': ANYBODY,
    'headline-lg': ANYBODY,
    'headline-lg-mobile': ANYBODY,
    'headline-md': ANYBODY,
    'headline-sm': ANYBODY,
    'body-lg': HANKEN,
    'body-md': HANKEN,
    'label-md': MONO,
    'label-sm': MONO,
    caption: MONO,
  },
  // [size, lineHeight, letterSpacing?, fontWeight?]
  fontSize: {
    'display-xl': ['80px', '88px', '-0.04em', '800'],
    'display-lg': ['64px', '72px', '-0.03em', '800'],
    'display-lg-mobile': ['40px', '46px', '-0.02em', '800'],
    'headline-xl': ['48px', '56px', '-0.02em', '700'],
    'headline-lg': ['32px', '40px', '-0.02em', '700'],
    'headline-lg-mobile': ['28px', '36px', '-0.01em', '700'],
    'headline-md': ['24px', '32px', '-0.01em', '700'],
    'headline-sm': ['20px', '28px', null, '700'],
    'body-lg': ['18px', '28px', null, '400'],
    'body-md': ['16px', '24px', null, '400'],
    'label-md': ['14px', '20px', '0.05em', '500'],
    'label-sm': ['12px', '16px', '0.08em', '500'],
    caption: ['12px', '16px', null, '500'],
  },
};

let css = '@import "tailwindcss";\n\n@theme {\n';
for (const [name, value] of Object.entries(config.colors)) {
  css += `  --color-${name}: ${value};\n`;
}
css += '\n';
for (const [name, value] of Object.entries(config.borderRadius)) {
  css += name === 'DEFAULT' ? `  --radius: ${value};\n` : `  --radius-${name}: ${value};\n`;
}
css += '\n';
for (const [name, value] of Object.entries(config.spacing)) {
  css += `  --spacing-${name}: ${value};\n`;
}
css += '\n';
for (const [name, value] of Object.entries(config.fontFamily)) {
  css += `  --font-${name}: ${value};\n`;
}
for (const [name, [size, lineHeight, letterSpacing, fontWeight]] of Object.entries(
  config.fontSize
)) {
  css += `\n  --text-${name}: ${size};\n`;
  css += `  --text-${name}--line-height: ${lineHeight};\n`;
  if (letterSpacing) css += `  --text-${name}--letter-spacing: ${letterSpacing};\n`;
  if (fontWeight) css += `  --text-${name}--font-weight: ${fontWeight};\n`;
}
css += '}\n';

writeFileSync(OUT, css, 'utf8');
console.log(`Wrote ${OUT} (${css.length} bytes, dark sub-brand)`);
