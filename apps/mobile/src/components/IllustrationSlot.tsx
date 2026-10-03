import { Image } from 'react-native';

const illustrations = {
  today: require('../../assets/illustrations/today.png'),
  journey: require('../../assets/illustrations/journey.png'),
  documents: require('../../assets/illustrations/documents.png'),
  me: require('../../assets/illustrations/me.png'),
  welcome: require('../../assets/illustrations/today.png'),
  language: require('../../assets/illustrations/me.png'),
  phone: require('../../assets/illustrations/documents.png'),
  profile: require('../../assets/illustrations/me.png'),
  history: require('../../assets/illustrations/documents.png'),
  scheme: require('../../assets/illustrations/journey.png'),
  caregiver: require('../../assets/illustrations/me.png'),
  reminders: require('../../assets/illustrations/today.png'),
  accounts: require('../../assets/illustrations/documents.png'),
  complete: require('../../assets/illustrations/journey.png'),
};

export type IllustrationName = keyof typeof illustrations;

export function IllustrationSlot({ name, label, size = 120 }:
  { name: IllustrationName; label?: string; size?: number }) {
  return <Image source={illustrations[name]} resizeMode="contain" style={{ width: size, height: size }}
    accessible={!!label} accessibilityLabel={label} accessibilityElementsHidden={!label}
    importantForAccessibility={label ? 'yes' : 'no-hide-descendants'} />;
}
