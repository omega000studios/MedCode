import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OnboardingDraft, PatientRepository } from './repository';
import { initialOnboardingDraft, mockRepository } from './mockRepository';

const onboardingKey = 'medcode.onboarding.v1';

async function readDraft(): Promise<OnboardingDraft> {
  const stored = await AsyncStorage.getItem(onboardingKey);
  if (!stored) return { ...initialOnboardingDraft };
  try {
    return { ...initialOnboardingDraft, ...JSON.parse(stored) };
  } catch {
    return { ...initialOnboardingDraft };
  }
}

export const appRepository: PatientRepository = {
  listPatients: () => mockRepository.listPatients(),
  getPatientJourney: patientId => mockRepository.getPatientJourney(patientId),
  getToday: state => mockRepository.getToday(state),
  getOnboardingDraft: readDraft,
  async saveOnboardingDraft(patch) {
    const next = { ...(await readDraft()), ...patch };
    await AsyncStorage.setItem(onboardingKey, JSON.stringify(next));
    return next;
  },
  async resetOnboarding() {
    await AsyncStorage.removeItem(onboardingKey);
    return { ...initialOnboardingDraft };
  },
};
