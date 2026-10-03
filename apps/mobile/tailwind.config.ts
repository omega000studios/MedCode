import { colors, fonts, spacing, radii, typeScale } from './src/theme/tokens';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'], presets: [require('nativewind/preset')],
  theme: { extend: {
    colors, fontFamily: { sans: [fonts.regular] },
    spacing: Object.fromEntries(Object.entries(spacing).map(([key, value]) => [key, `${value}px`])),
    borderRadius: Object.fromEntries(Object.entries(radii).map(([key, value]) => [key, `${value}px`])),
    fontSize: Object.fromEntries(Object.entries(typeScale).map(([key, value]) =>
      [key, [`${value.fontSize}px`, { lineHeight: `${value.lineHeight}px` }]])),
  } }, plugins: [],
} satisfies Config;
