import { useEffect, useRef, type PropsWithChildren } from 'react';
import { BackHandler, Text } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';
import { colors, fonts, typeScale, spacing, radii } from '../theme/tokens';

export function BottomSheet({ open, onClose, title, children }:
  PropsWithChildren<{ open: boolean; onClose: () => void; title: string }>) {
  const ref = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  useEffect(() => { if (open) ref.current?.present(); else ref.current?.dismiss(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => { ref.current?.dismiss(); return true; });
    return () => subscription.remove();
  }, [open]);
  return <BottomSheetModal ref={ref} onDismiss={onClose} enablePanDownToClose
    backgroundStyle={{ backgroundColor: colors.surface, borderRadius: radii.card }}
    handleIndicatorStyle={{ backgroundColor: colors.muted }}
    backdropComponent={props => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}>
    <BottomSheetView accessibilityViewIsModal style={{ padding: spacing.screen,
      paddingBottom: spacing.screen + insets.bottom, gap: spacing.sm }}>
      <Text accessibilityRole="header" style={{ ...typeScale.title, fontFamily: fonts.semibold, color: colors.ink }}>{title}</Text>
      {children}
      <Button label="Close" variant="secondary" onPress={() => ref.current?.dismiss()} />
    </BottomSheetView>
  </BottomSheetModal>;
}

