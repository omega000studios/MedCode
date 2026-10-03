import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import { appRepository } from '../data/appRepository';
import type { OnboardingDraft } from '../data/repository';
import { initialOnboardingDraft } from '../data/mockRepository';
import { Button } from './Button';
import { Chip } from './Chip';
import { IllustrationSlot, type IllustrationName } from './IllustrationSlot';
import { ListenButton } from './ListenButton';
import { ProgressDots } from './ProgressDots';
import { colors, fonts, radii, spacing, typeScale } from '../theme/tokens';

const screens: { title: string; prompt: string; illustration: IllustrationName }[] = [
  { title: 'Welcome to MedCode', prompt: 'Know what happens next in your care.', illustration: 'welcome' },
  { title: 'Choose your language', prompt: 'You can change this later.', illustration: 'language' },
  { title: 'Sign in with your phone', prompt: 'We use a demo code today.', illustration: 'phone' },
  { title: 'Tell us about you', prompt: 'This helps personalise your journey.', illustration: 'profile' },
  { title: 'Your medical history', prompt: 'Choose anything that applies.', illustration: 'history' },
  { title: 'Scheme or insurance', prompt: 'It is okay if you are unsure.', illustration: 'scheme' },
  { title: 'Add a caregiver', prompt: 'They only see what you allow.', illustration: 'caregiver' },
  { title: 'Set your reminders', prompt: 'Choose when we can remind you.', illustration: 'reminders' },
  { title: 'Link health accounts', prompt: 'Skip now and link them later.', illustration: 'accounts' },
  { title: 'You are all set', prompt: 'Your Today page is ready.', illustration: 'complete' },
];

const fieldStyle = {
  minHeight: spacing.touch, borderWidth: 1, borderColor: colors.muted, borderRadius: radii.button,
  paddingHorizontal: spacing.sm, color: colors.ink, backgroundColor: colors.surface,
  ...typeScale.body, fontFamily: fonts.regular,
} as const;

function Field({ label, ...props }: React.ComponentProps<typeof TextInput> & { label: string }) {
  return <View style={{ gap: spacing.xs }}>
    <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>{label}</Text>
    <TextInput {...props} accessibilityLabel={label} placeholderTextColor={colors.muted} style={fieldStyle} />
  </View>;
}

function ChoiceRow({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={() => onChange(!value)}
    style={{ minHeight: spacing.touch, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      gap: spacing.sm, paddingVertical: spacing.xs }}>
    <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink, flex: 1 }}>{label}</Text>
    <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.muted, true: colors.primary }} />
  </Pressable>;
}

function Chips({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
    {options.map(option => <Chip key={option} label={option} selected={selected.includes(option)} onPress={() => onToggle(option)} />)}
  </View>;
}

export function OnboardingScreen({ step }: { step: number }) {
  const [draft, setDraft] = useState<OnboardingDraft>(initialOnboardingDraft);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState('Loading saved answers…');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const screen = screens[step] ?? screens[0];

  useEffect(() => {
    appRepository.getOnboardingDraft().then(value => { setDraft(value); setSaved('Answers saved automatically'); setLoading(false); });
  }, []);

  const persist = (patch: Partial<OnboardingDraft>) => {
    setDraft(current => ({ ...current, ...patch }));
    setSaved('Saving…');
    appRepository.saveOnboardingDraft(patch).then(() => setSaved('Saved')).catch(() => setSaved('Save failed — try again'));
  };
  const toggle = (key: 'conditions' | 'allergies' | 'medicines' | 'procedures', value: string) => {
    const current = draft[key];
    persist({ [key]: current.includes(value) ? current.filter(item => item !== value) : [...current, value] });
  };
  const goTo = async (nextStep: number) => {
    await appRepository.saveOnboardingDraft({ currentStep: nextStep });
    router.push(`/onboarding/${nextStep}`);
  };
  const skip = () => goTo(Math.min(step + 1, 9));

  const next = async () => {
    setError('');
    if (step === 1 && !draft.language) return setError('Choose a language to continue.');
    if (step === 2) {
      if (!otpSent) {
        if (!/^\d{10}$/.test(draft.phone)) return setError('Enter a 10-digit mobile number.');
        setOtpSent(true); setSaved('Demo OTP sent'); return;
      }
      if (otp !== '123456') return setError('Use the demo OTP 123456.');
      await appRepository.saveOnboardingDraft({ phoneVerified: true, currentStep: 3 });
      router.push('/onboarding/3'); return;
    }
    if (step === 3 && (!draft.name.trim() || !draft.age || !draft.sex || !draft.cancerType))
      return setError('Complete each field to continue.');
    if (step === 9) {
      await appRepository.saveOnboardingDraft({ completed: true, currentStep: 9 });
      router.replace('/(tabs)'); return;
    }
    await goTo(step + 1);
  };

  const content = (() => {
    switch (step) {
      case 0: return <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>
        Clear next steps, local language, and help from your care team.</Text>;
      case 1: return <Chips options={['English', 'हिन्दी', 'मराठी', 'தமிழ்', 'বাংলা']}
        selected={[draft.language]} onToggle={language => persist({ language })} />;
      case 2: return <View style={{ gap: spacing.sm }}>
        <Field label="Mobile number" keyboardType="phone-pad" maxLength={10} value={draft.phone}
          onChangeText={phone => persist({ phone: phone.replace(/\D/g, ''), phoneVerified: false })} placeholder="10-digit mobile number" />
        {otpSent && <>
          <Field label="One-time password" keyboardType="number-pad" maxLength={6} value={otp}
            onChangeText={setOtp} placeholder="6-digit code" />
          <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.primary }}>Demo OTP: 123456 · Resend in 30 seconds</Text>
        </>}
      </View>;
      case 3: return <View style={{ gap: spacing.sm }}>
        <Field label="Full name" value={draft.name} onChangeText={name => persist({ name })} placeholder="Your name" />
        <Field label="Age" value={draft.age} onChangeText={age => persist({ age: age.replace(/\D/g, '') })}
          keyboardType="number-pad" maxLength={3} placeholder="Age in years" />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Sex</Text>
        <Chips options={['Female', 'Male', 'Other', 'Prefer not to say']} selected={[draft.sex]}
          onToggle={sex => persist({ sex })} />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Cancer type</Text>
        <Chips options={['Breast cancer', 'Not sure']} selected={[draft.cancerType]}
          onToggle={cancerType => persist({ cancerType })} />
      </View>;
      case 4: return <View style={{ gap: spacing.sm }}>
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Conditions</Text>
        <Chips options={['Diabetes', 'High blood pressure', 'None']} selected={draft.conditions} onToggle={value => toggle('conditions', value)} />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Allergies</Text>
        <Chips options={['Medicine allergy', 'Food allergy', 'None']} selected={draft.allergies} onToggle={value => toggle('allergies', value)} />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Medicines</Text>
        <Chips options={['Daily medicines', 'Supplements', 'None']} selected={draft.medicines} onToggle={value => toggle('medicines', value)} />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Past procedures</Text>
        <Chips options={['Surgery', 'Biopsy', 'None']} selected={draft.procedures} onToggle={value => toggle('procedures', value)} />
        <Button label="Record voice note · Demo" variant="secondary"
          onPress={() => Alert.alert('Voice note · Demo', 'Voice recording will be connected later.')} />
      </View>;
      case 5: return <Chips options={['PM-JAY · Demo', 'Employer insurance', 'Private insurance', 'Paying myself', 'Not sure']}
        selected={[draft.scheme]} onToggle={scheme => persist({ scheme })} />;
      case 6: return <View style={{ gap: spacing.sm }}>
        <Field label="Caregiver name" value={draft.caregiverName} onChangeText={caregiverName => persist({ caregiverName })} placeholder="Name" />
        <Field label="WhatsApp number" keyboardType="phone-pad" value={draft.caregiverWhatsApp}
          onChangeText={caregiverWhatsApp => persist({ caregiverWhatsApp: caregiverWhatsApp.replace(/\D/g, '') })} placeholder="10-digit number" />
        <ChoiceRow label="I consent to sharing journey status" value={draft.caregiverConsent}
          onChange={caregiverConsent => persist({ caregiverConsent })} />
      </View>;
      case 7: return <View style={{ gap: spacing.sm }}>
        <ChoiceRow label="WhatsApp reminders" value={draft.whatsappReminders}
          onChange={whatsappReminders => persist({ whatsappReminders })} />
        <Text style={{ ...typeScale.body, fontFamily: fonts.semibold, color: colors.ink }}>Quiet hours</Text>
        <Chips options={['9:00 pm – 7:00 am', '10:00 pm – 8:00 am', 'No quiet hours']}
          selected={[draft.quietHours]} onToggle={quietHours => persist({ quietHours })} />
      </View>;
      case 8: return <View style={{ gap: spacing.xs }}>
        <ChoiceRow label="Link ABHA later" value={draft.linkAbha} onChange={linkAbha => persist({ linkAbha })} />
        <ChoiceRow label="Link DigiLocker later" value={draft.linkDigiLocker} onChange={linkDigiLocker => persist({ linkDigiLocker })} />
        <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>
          No Aadhaar or PAN number is requested here.</Text>
      </View>;
      case 9: return <View style={{ gap: spacing.xs }}>
        <Text style={{ ...typeScale.heading, fontFamily: fonts.semibold, color: colors.ink }}>{draft.name || 'Your journey'} is ready</Text>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>Today will always show your next useful action.</Text>
      </View>;
      default: return null;
    }
  })();

  if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} />;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, padding: spacing.screen, gap: spacing.sm }}>
        <View style={{ minHeight: spacing.touch, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" disabled={step === 0}
            onPress={() => router.back()} style={{ minWidth: spacing.touch, minHeight: spacing.touch,
              alignItems: 'center', justifyContent: 'center', opacity: step === 0 ? 0 : 1 }}>
            <ArrowLeft color={colors.ink} size={spacing.md} />
          </Pressable>
          <Text style={{ ...typeScale.caption, fontFamily: fonts.regular, color: colors.ink }}>{saved}</Text>
        </View>
        <ProgressDots current={step} />
        <View style={{ alignItems: 'center' }}><IllustrationSlot name={screen.illustration} size={step === 0 || step === 9 ? 180 : 120} /></View>
        <Text accessibilityRole="header" style={{ ...typeScale.display, fontFamily: fonts.semibold, color: colors.ink }}>{screen.title}</Text>
        <Text style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.ink }}>{screen.prompt}</Text>
        <ListenButton text={`${screen.title}. ${screen.prompt}`} />
        <View style={{ gap: spacing.sm, flexGrow: 1 }}>{content}</View>
        {!!error && <Text accessibilityRole="alert" style={{ ...typeScale.body, fontFamily: fonts.regular, color: colors.danger }}>{error}</Text>}
        <Button label={step === 0 ? 'Start' : step === 2 && !otpSent ? 'Send demo OTP' : step === 9 ? 'Go to Today' : 'Continue'} onPress={next} />
        {(step === 6 || step === 8) && <Button label="Skip for now" variant="secondary" onPress={skip} />}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
