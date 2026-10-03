import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fonts, spacing, radii, typeScale } from '../theme/tokens';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string; variant?: 'primary' | 'secondary'; style?: StyleProp<ViewStyle>;
};

export function Button({ label, variant = 'primary', disabled, style, ...props }: ButtonProps) {
  return <Pressable {...props} accessibilityRole="button" disabled={disabled} className="active:opacity-60"
    accessibilityState={{ ...props.accessibilityState, disabled: !!disabled }}
    style={[{ minHeight: spacing.touch, minWidth: spacing.touch, padding: spacing.sm, borderRadius: radii.button,
      alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.6 : undefined,
      backgroundColor: variant === 'primary' ? colors.primary : colors.bg }, style]}>
    <Text style={{ ...typeScale.body, fontFamily: fonts.semibold,
      color: variant === 'primary' ? colors.surface : colors.ink }}>{label}</Text>
  </Pressable>;
}

