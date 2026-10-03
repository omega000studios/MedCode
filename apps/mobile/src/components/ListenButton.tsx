import { Alert } from 'react-native';
import { Button } from './Button';

export function ListenButton({ text }: { text: string }) {
  return <Button label="Listen · Demo" variant="secondary" accessibilityLabel="Listen, demo placeholder"
    accessibilityHint="Read aloud is not connected yet"
    onPress={() => Alert.alert('Listen · Demo', `Read aloud will be added later.\n\n${text}`)} />;
}
