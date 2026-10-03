import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fonts, typeScale, spacing, radii } from '../theme/tokens';

type ChipProps = Omit<PressableProps, 'style'> & { label: string; selected?: boolean; style?: StyleProp<ViewStyle> };
export function Chip({ label, selected = false, disabled, style, ...props }: ChipProps) {
  return <Pressable {...props} accessibilityRole="button" disabled={disabled} className="active:opacity-60"
    accessibilityState={{ ...props.accessibilityState, selected, disabled: !!disabled }}
    style={[{ minHeight: spacing.touch, minWidth: spacing.touch, justifyContent: 'center', paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs, borderRadius: radii.chip, borderWidth: 1,
      borderColor: selected ? colors.primary : colors.muted,
      backgroundColor: selected ? colors.primary : colors.surface,
      opacity: disabled ? 0.6 : undefined }, style]}>
    <Text style={{ ...typeScale.body, fontFamily: fonts.regular,
      color: selected ? colors.surface : colors.ink }}>{label}</Text>
  </Pressable>;
}

