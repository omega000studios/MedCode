import { useEffect, useState } from 'react';
import { Alert, Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bell from 'lucide-react-native/icons/bell';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import Circle from 'lucide-react-native/icons/circle';
import CircleCheck from 'lucide-react-native/icons/circle-check';
import ClipboardCheck from 'lucide-react-native/icons/clipboard-check';
import Globe2 from 'lucide-react-native/icons/globe';
import MessageSquare from 'lucide-react-native/icons/message-square';
import Share2 from 'lucide-react-native/icons/share-2';
import Ticket from 'lucide-react-native/icons/ticket';
import Undo2 from 'lucide-react-native/icons/undo-2';
import Upload from 'lucide-react-native/icons/upload';
import UserRound from 'lucide-react-native/icons/user-round';
import { appRepository } from '../data/appRepository';
import type { TodayCard, TodayStateKind, TodayView } from '../data/repository';
import { colors, fonts, radii, spacing, typeScale } from '../theme/tokens';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { Card } from './Card';
import { Chip } from './Chip';
import { IllustrationSlot } from './IllustrationSlot';
import { ListenButton } from './ListenButton';
import { StatusBanner } from './StatusBanner';
import { SwipeCardStack } from './SwipeCardStack';

const stateLabels: { key: TodayStateKind; label: string }[] = [
  { key: 'visit_day', label: 'Visit day' }, { key: 'between_visits', label: 'Between visits' },
  { key: 'on_hold', label: 'On hold' }, { key: 'all_done', label: 'All done' },
];

function IconButton({ label, children, onPress }: { label: string; children: React.ReactNode; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
    style={{ minWidth: spacing.touch, minHeight: spacing.touch, alignItems: 'center', justifyContent: 'center',
      borderRadius: spacing.touch / 2, backgroundColor: colors.surface }}>
    {children}
  </Pressable>;
}

export function TodayScreen() {
  const [kind, setKind] = useState<TodayStateKind>('visit_day');
  const [view, setView] = useState<TodayView | null>(null);
  const [dismissed, setDismissed] = useState<TodayCard[]>([]);
  const [selected, setSelected] = useState<TodayCard | null>(null);
  const [toast, setToast] = useState('');
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let active = true;
    appRepository.getToday(kind).then(next => {
      if (!active) return;
      setView(next);
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 180, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 180, useNativeDriver: false }),
      ]).start();
    });
    return () => { active = false; };
  }, [kind, pulse]);

  if (!view) return <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} />;
  const cards = view.cards.filter(card => !dismissed.some(item => item.id === card.id)).slice(0, 4);
  const dismiss = (card: TodayCard, message = 'Marked done') => {
    setDismissed(current => [...current, card]); setToast(message);
  };
  const left = (card: TodayCard) => Alert.alert(card.title, 'What would help?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Remind me later', onPress: () => dismiss(card, 'Reminder set for later') },
    { text: 'Ask staff', onPress: () => dismiss(card, 'Question sent to Anjali · Demo') },
  ]);
  const undo = () => {
    setDismissed(current => current.slice(0, -1)); setToast('');
  };
  const demoAction = (title: string) => Alert.alert(`${title} · Demo`, 'This action will be connected in a later milestone.');
  const quickActions = [
    { label: 'Upload', Icon: Upload }, { label: 'Check-in', Icon: ClipboardCheck },
    { label: 'Ask staff', Icon: MessageSquare }, { label: 'Share', Icon: Share2 },
  ];

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top', 'left', 'right']}>
    <ScrollView contentContainerStyle={{ padding: spacing.screen, paddingBottom: spacing.xl, gap: spacing.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <View style={{ width: spacing.touch, height: spacing.touch, borderRadius: spacing.touch / 2,
          backgroundColor: `${colors.primary}18`, alignItems: 'center', justifyContent: 'center' }}>
          <UserRound color={colors.primary} size={spacing.md} />
        </View>
        <View style={{ flex: 1 }}>
          <Text accessibilityRole="header" style={{ ...typeScale.title, fontFamily: fonts.semibold, color: colors.ink }}>{view.greeting}</Text>
          <Animated.Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink,
            backgroundColor: pulse.interpolate({ inputRange: [0, 1], outputRange: ['transparent', `${colors['success-soft']}40`] }) }}>
            {view.updatedLabel}</Animated.Text>
        </View>
        <IconButton label="Change language" onPress={() => demoAction('Language')}><Globe2 color={colors.ink} size={spacing.md} /></IconButton>
        <IconButton label="Notifications" onPress={() => demoAction('Notifications')}><Bell color={colors.ink} size={spacing.md} /></IconButton>
      </View>

      <Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color: colors.ink }}>DEMO STATE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.xs }}>
        {stateLabels.map(item => <Chip key={item.key} label={item.label} selected={kind === item.key} onPress={() => {
          setView(null); setDismissed([]); setToast(''); setKind(item.key);
        }} />)}
      </ScrollView>

      <StatusBanner status={view.status.kind} reason={view.status.reason} owner={view.status.owner}
        lastConfirmedAt={view.status.lastConfirmedAt} />

      {cards.length ? <SwipeCardStack cards={cards} onDismiss={dismiss} onLeft={left} onOpen={setSelected} /> : <Card style={{ alignItems: 'center' }}>
        <IllustrationSlot name="complete" size={128} />
        <Text style={{ ...typeScale.title, fontFamily: fonts.semibold, color: colors.ink }}>All done for today</Text>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink, textAlign: 'center' }}>Next: {view.nextUpcoming}</Text>
      </Card>}
      {!!toast && <View accessibilityLiveRegion="polite" style={{ minHeight: spacing.touch, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, paddingHorizontal: spacing.sm,
        borderRadius: radii.button, backgroundColor: colors.ink }}>
        <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.surface, flex: 1 }}>{toast}</Text>
        <Pressable accessibilityRole="button" onPress={undo} style={{ minHeight: spacing.touch, minWidth: spacing.touch,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs }}>
          <Undo2 color={colors.surface} size={18} /><Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color: colors.surface }}>Undo</Text>
        </Pressable>
      </View>}

      {view.token && <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Ticket color={colors.primary} size={spacing.md} /><Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>Queue token</Text>
          <Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color: colors.primary }}>DEMO</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
          <View><Text style={{ ...typeScale.display, fontFamily: fonts.semibold, color: colors.primary }}>{view.token.number}</Text>
            <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>{view.token.destination}</Text></View>
          <View style={{ alignItems: 'flex-end' }}><Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>{view.token.wait}</Text>
            <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>Estimated wait</Text></View>
        </View>
      </Card>}

      <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>Today’s timeline</Text>
      <Card>{view.timeline.map((item, index) => {
        const color = item.status === 'done' ? colors.success : item.status === 'now' ? colors.primary : colors.muted;
        const Icon = item.status === 'done' ? CircleCheck : Circle;
        return <View key={`${item.time}-${item.title}`} style={{ flexDirection: 'row', gap: spacing.sm,
          paddingBottom: index === view.timeline.length - 1 ? 0 : spacing.sm }}>
          <Icon color={color} size={spacing.md} />
          <View style={{ flex: 1 }}><Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color }}>{item.time.toUpperCase()} · {item.status.toUpperCase()}</Text>
            <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>{item.title}</Text>
            <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>{item.detail}</Text></View>
        </View>;
      })}</Card>

      <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>Your care team</Text>
      <Card>
        <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>{view.careTeam.name}</Text>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>{view.careTeam.role}</Text>
        <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>{view.careTeam.availability}</Text>
        <View style={{ flexDirection: 'row', gap: spacing.xs }}>
          <Button label="Call" variant="secondary" style={{ flex: 1 }} onPress={() => demoAction('Call care team')} />
          <Button label="WhatsApp" style={{ flex: 1 }} onPress={() => demoAction('WhatsApp care team')} />
        </View>
      </Card>

      <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>Quick actions</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
        {quickActions.map(({ label, Icon }) => <Pressable key={label} accessibilityRole="button" onPress={() => demoAction(label)}
          style={{ minHeight: 88, width: '48%', flexGrow: 1, padding: spacing.sm, gap: spacing.xs,
            justifyContent: 'center', borderRadius: radii.button, backgroundColor: colors.surface,
            borderWidth: 1, borderColor: `${colors.muted}40` }}>
          <Icon color={colors.primary} size={spacing.md} /><Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>{label}</Text>
        </Pressable>)}
      </View>

      <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>Useful now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.xs }}>
        {view.info.map(item => <Pressable key={item.label} accessibilityRole="button" onPress={() => demoAction(item.label)}
          style={{ width: 248, minHeight: 112, padding: spacing.sm, gap: spacing.xs, borderRadius: radii.card,
            backgroundColor: colors.surface, borderWidth: 1, borderColor: `${colors.muted}40` }}>
          <Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color: colors.primary }}>{item.label}</Text>
          <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>{item.title}</Text>
          <ChevronRight color={colors.primary} size={spacing.md} />
        </Pressable>)}
      </ScrollView>
      <ListenButton text={`${view.greeting}. ${view.status.reason ?? ''}. Next: ${view.nextUpcoming}.`} />
    </ScrollView>

    <BottomSheet open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? 'Card details'}>
      {!!selected && <>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>{selected.detail}</Text>
        {selected.directions && <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.primary }}>{selected.directions}</Text>}
        <ListenButton text={`${selected.title}. ${selected.detail}`} />
      </>}
    </BottomSheet>
  </SafeAreaView>;
}
