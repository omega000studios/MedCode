import { useEffect, useState } from 'react';
import {
  AccessibilityInfo, Animated, PanResponder, Text, View, useWindowDimensions,
  type AccessibilityActionEvent,
} from 'react-native';
import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ArrowRight from 'lucide-react-native/icons/arrow-right';
import { type TodayCard } from '../data/repository';
import { colors, fonts, radii, spacing, typeScale } from '../theme/tokens';
import { Button } from './Button';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => subscription.remove();
  }, []);
  return reduced;
}

function SwipeCard({ card, onRight, onLeft, onOpen }: {
  card: TodayCard; onRight: () => void; onLeft: () => void; onOpen: () => void;
}) {
  const [position] = useState(() => new Animated.ValueXY());
  const { width } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const leave = (direction: 'left' | 'right', done: () => void) => {
    const x = direction === 'right' ? width : -width;
    if (reducedMotion) { position.setValue({ x: 0, y: 0 }); done(); return; }
    Animated.spring(position, { toValue: { x, y: 0 }, speed: 22, bounciness: 2,
      useNativeDriver: true }).start(() => { position.setValue({ x: 0, y: 0 }); done(); });
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderMove: Animated.event([null, { dx: position.x }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 88) leave('right', onRight);
      else if (gesture.dx < -88) leave('left', onLeft);
      else if (Math.abs(gesture.dx) < 8 && Math.abs(gesture.dy) < 8) onOpen();
      else Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
    },
    onPanResponderTerminate: () => Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start(),
  });
  const rotate = position.x.interpolate({ inputRange: [-width, 0, width], outputRange: ['-5deg', '0deg', '5deg'] });
  const accessibilityAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === 'activate') onOpen();
    if (event.nativeEvent.actionName === 'done') leave('right', onRight);
    if (event.nativeEvent.actionName === 'ask') leave('left', onLeft);
  };
  return <Animated.View style={{ transform: [...position.getTranslateTransform(), { rotate }] }}>
    <View style={{ backgroundColor: colors.surface, borderRadius: radii.card, borderWidth: 1,
      borderColor: `${colors.muted}40`, padding: spacing.screen, gap: spacing.sm,
      shadowColor: colors.ink, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.08,
      shadowRadius: 12, elevation: 3 }}>
      <View {...panResponder.panHandlers} accessible accessibilityRole="button" accessibilityLabel={`${card.title}. ${card.body}`}
        accessibilityHint="Tap for details. Swipe right when done or left for help."
        accessibilityActions={[{ name: 'activate', label: 'Open details' }, { name: 'done', label: 'Mark done' },
          { name: 'ask', label: 'Remind me later or ask staff' }]}
        onAccessibilityAction={accessibilityAction} style={{ gap: spacing.xs }}>
        <Text style={{ ...typeScale.caption, fontFamily: fonts.semibold, color: colors.primary }}>{card.eyebrow}</Text>
        <Text style={{ ...typeScale.title, fontFamily: fonts.semibold, color: colors.ink }}>{card.title}</Text>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>{card.body}</Text>
        {card.destination && <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.primary }}>{card.destination}</Text>}
      </View>
      <Button label={card.action} onPress={() => leave('right', onRight)} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flex: 1 }}>
          <ArrowLeft color={colors.muted} size={18} /><Text style={{ ...typeScale.caption, color: colors.ink, fontFamily: fonts.regular }}>Later or ask staff</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.xs, flex: 1 }}>
          <Text style={{ ...typeScale.caption, color: colors.ink, fontFamily: fonts.regular }}>Done</Text><ArrowRight color={colors.success} size={18} />
        </View>
      </View>
    </View>
  </Animated.View>;
}

export function SwipeCardStack({ cards, onDismiss, onOpen, onLeft }: {
  cards: TodayCard[]; onDismiss: (card: TodayCard) => void; onOpen: (card: TodayCard) => void;
  onLeft: (card: TodayCard) => void;
}) {
  const visible = cards.slice(0, 4);
  if (!visible.length) return null;
  return <View style={{ minHeight: 336, justifyContent: 'flex-end' }}>
    {visible.slice(1, 3).reverse().map((card, index) => <View key={card.id} pointerEvents="none" style={{
      position: 'absolute', left: spacing.xs * (index + 1), right: spacing.xs * (index + 1),
      bottom: spacing.xs * (index + 1), height: 260, borderRadius: radii.card,
      backgroundColor: index ? `${colors.primary}18` : colors.surface, borderWidth: 1,
      borderColor: `${colors.muted}35`,
    }} />)}
    <SwipeCard key={visible[0].id} card={visible[0]} onRight={() => onDismiss(visible[0])}
      onLeft={() => onLeft(visible[0])} onOpen={() => onOpen(visible[0])} />
  </View>;
}
