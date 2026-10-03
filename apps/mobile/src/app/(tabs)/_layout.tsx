import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import Route from 'lucide-react-native/icons/route';
import Files from 'lucide-react-native/icons/files';
import UserRound from 'lucide-react-native/icons/user-round';
import { colors, fonts, typeScale, spacing } from '../../theme/tokens';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.ink, tabBarStyle: { backgroundColor: colors.surface, height: spacing.touch + spacing.lg + insets.bottom },
    tabBarItemStyle: { minHeight: spacing.touch },
    tabBarLabel: ({ color, children }) => <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color, textAlign: 'center', flexShrink: 1 }}>{children}</Text> }}>
    <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }} />
    <Tabs.Screen name="journey" options={{ title: 'Journey', tabBarIcon: ({ color, size }) => <Route color={color} size={size} /> }} />
    <Tabs.Screen name="documents" options={{ title: 'Documents', tabBarIcon: ({ color, size }) => <Files color={color} size={size} /> }} />
    <Tabs.Screen name="me" options={{ title: 'Me', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }} />
  </Tabs>;
}



