import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IllustrationSlot } from './IllustrationSlot';
import { ListenButton } from './ListenButton';
import { colors, fonts, typeScale, spacing } from '../theme/tokens';

export function TabPlaceholder({ title, illustration }:
  { title: string; illustration: 'today' | 'journey' | 'documents' | 'me' }) {
  return <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-bg">
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: spacing.screen, gap: spacing.sm }}>
      <Text accessibilityRole="header" style={{ ...typeScale.display, color: colors.ink, fontFamily: fonts.semibold }}>{title}</Text>
      <IllustrationSlot name={illustration} />
      <Text style={{ ...typeScale.body, color: colors.ink, fontFamily: fonts.regular }}>Demo · This screen is coming next.</Text>
      <ListenButton text={`${title}. Demo. This screen is coming next.`} />
    </ScrollView>
  </SafeAreaView>;
}
