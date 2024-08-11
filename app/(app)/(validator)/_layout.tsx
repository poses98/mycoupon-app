import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ArialRonded: require('@/assets/fonts/ArialRoundedMTBold.ttf'),
  });

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.light.buttonYellow },
        tabBarBadgeStyle: { backgroundColor: Colors.light.tint },
        tabBarIconStyle: { color: Colors.light.tint },
        tabBarLabelStyle: { color: Colors.light.tint },
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.inactiveIcon,
      }}
    >
      <Tabs.Screen
        name="validator"
        options={{
          title: 'Cámara',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="camera" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => (
            <Entypo name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
