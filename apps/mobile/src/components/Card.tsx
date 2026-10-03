import { View, type ViewProps } from 'react-native';
import { colors, spacing, radii } from '../theme/tokens';

export function Card({ style, ...props }: ViewProps) {
  return <View {...props} style={[{ backgroundColor: colors.surface, padding: spacing.sm,
    borderRadius: radii.card, borderWidth: 1, borderColor: `${colors.muted}40`,
    gap: spacing.sm, shadowColor: colors.ink, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }, style]} />;
}
