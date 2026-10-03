import { colors } from './src/theme/tokens.ts';
export default {
  expo: {
    name: 'MedCode', slug: 'medcode-patient', version: '1.0.0', scheme: 'medcode',
    orientation: 'portrait', userInterfaceStyle: 'light',
    icon: './assets/icon.png', backgroundColor: colors.bg,
    ios: { supportsTablet: true },
    android: { package: 'com.medcode.patient', predictiveBackGestureEnabled: true },
    web: { bundler: 'metro', favicon: './assets/favicon.png' },
    plugins: ['expo-router'],
  },
};

