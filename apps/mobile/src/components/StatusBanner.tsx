import { Text, View } from 'react-native';
import CircleCheck from 'lucide-react-native/icons/circle-check';
import CirclePause from 'lucide-react-native/icons/circle-pause';
import WifiOff from 'lucide-react-native/icons/wifi-off';
import CircleAlert from 'lucide-react-native/icons/circle-alert';
import { colors, fonts, typeScale, spacing, radii } from '../theme/tokens';

const statuses = {
  on_track: { Icon: CircleCheck, color: colors.success, label: 'On track' },
  complete: { Icon: CircleCheck, color: colors.success, label: 'All done today' },
  held: { Icon: CirclePause, color: colors.warn, label: 'On hold' },
  offline: { Icon: WifiOff, color: colors.muted, label: 'Offline' },
  error: { Icon: CircleAlert, color: colors.danger, label: 'Something went wrong' },
};
type Props = { status: keyof typeof statuses; reason?: string; owner?: string; lastConfirmedAt?: string };

export function StatusBanner({ status, reason, owner, lastConfirmedAt }: Props) {
  const { Icon, color, label } = statuses[status];
  return <View accessibilityLiveRegion="polite" style={{ padding: spacing.sm, gap: spacing.xs,
    backgroundColor: colors.surface, borderRadius: radii.card, borderWidth: 1, borderColor: color }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
      <Icon color={color} size={spacing.md} accessibilityElementsHidden importantForAccessibility="no" />
      <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>{label}</Text>
    </View>
    {reason && <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>{reason}</Text>}
    {owner && <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>Contact: {owner}</Text>}
    {lastConfirmedAt && <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>
      Last confirmed: {new Date(lastConfirmedAt).toLocaleString()}</Text>}
  </View>;
}

