import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { appRepository } from '../data/appRepository';
import type { OnboardingDraft } from '../data/repository';
import { colors } from '../theme/tokens';

export default function Entry() {
  const [draft, setDraft] = useState<OnboardingDraft | null>(null);
  useEffect(() => { appRepository.getOnboardingDraft().then(setDraft); }, []);
  if (!draft) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
    <ActivityIndicator accessibilityLabel="Loading saved onboarding" color={colors.primary} />
  </View>;
  return <Redirect href={draft.completed ? '/(tabs)' : `/onboarding/${draft.currentStep}`} />;
}
