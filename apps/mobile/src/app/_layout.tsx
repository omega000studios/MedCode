import '../../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { NotoSansDevanagari_400Regular } from '@expo-google-fonts/noto-sans-devanagari/400Regular';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors, fonts, spacing, typeScale } from '../theme/tokens';

export default function RootLayout() {
  const [loaded, error] = useFonts({ PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, NotoSansDevanagari_400Regular });
  if (!loaded && !error) return <View className="flex-1 items-center justify-center bg-bg">
    <ActivityIndicator color={colors.primary} accessibilityLabel="Loading app" />
  </View>;
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider><BottomSheetModalProvider>
      <StatusBar style="dark" />
      {error && <Text accessibilityRole="alert" style={{ ...typeScale.body, color: colors.danger,
        padding: spacing.sm, fontFamily: fonts.regular }}>Custom fonts unavailable. Using device fonts.</Text>}
      <Stack screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 200,
        contentStyle: { backgroundColor: colors.bg } }} />
    </BottomSheetModalProvider></SafeAreaProvider>
  </GestureHandlerRootView>;
}

