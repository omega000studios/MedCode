export const colors = {
  ink: '#101010', bg: '#FBF8F3', surface: '#FFFFFF', primary: '#3D55A5',
  accent: '#F43659', success: '#76994F', 'success-soft': '#A0AA4B',
  warn: '#D6A73E', danger: '#9C292A', muted: '#99968E',
} as const;

export const fonts = {
  regular: 'PlusJakartaSans_400Regular', semibold: 'PlusJakartaSans_600SemiBold',
  devanagari: 'NotoSansDevanagari_400Regular',
} as const;

export const typeScale = {
  display: { fontSize: 28, lineHeight: 34 }, title: { fontSize: 22, lineHeight: 28 },
  heading: { fontSize: 18, lineHeight: 24 }, body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 13, lineHeight: 18 },
} as const;
export const spacing = { none: 0, xs: 8, sm: 16, screen: 20, md: 24, lg: 32, xl: 40, touch: 48 } as const;
export const radii = { button: 16, card: 24, chip: 24 } as const;

export const theme = { colors, fonts, typeScale, spacing, radii };
