import { useLocalSearchParams } from 'expo-router';
import { OnboardingScreen } from '../../components/OnboardingScreen';

export default function OnboardingStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const value = Math.max(0, Math.min(9, Number(step) || 0));
  return <OnboardingScreen step={value} />;
}
