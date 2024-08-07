import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import AuthProvider from '@/providers/AuthProvider';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
