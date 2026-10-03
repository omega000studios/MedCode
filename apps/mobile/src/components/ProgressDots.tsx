import { View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

export function ProgressDots({ current, total = 10 }: { current: number; total?: number }) {
  return <View accessible accessibilityRole="progressbar"
    accessibilityLabel={`Onboarding step ${current + 1} of ${total}`}
    accessibilityValue={{ min: 1, max: total, now: current + 1 }}
    style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.xs }}>
    {Array.from({ length: total }, (_, index) => <View key={index} style={{
      width: index === current ? spacing.md : spacing.xs, height: spacing.xs,
      borderRadius: spacing.xs, backgroundColor: index <= current ? colors.primary : `${colors.muted}55`,
    }} />)}
  </View>;
}
