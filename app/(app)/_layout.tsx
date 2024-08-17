import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import AuthProvider from '@/providers/AuthProvider';
import { SafeAreaView, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import CustomDrawerContent from '@/components/CustomDrawerContent';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ArialRonded: require('@/assets/fonts/ArialRoundedMTBold.ttf'),
  });

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded || isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!isLoading && user !== null) {
    return (
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
              drawerContent={(props) => {
                return <CustomDrawerContent {...props} />;
              }}
              screenOptions={{
                drawerActiveTintColor: 'rgba(255, 255, 255, 0.1)',
                drawerLabelStyle: {
                  color: '#fff',
                  fontSize: 22,
                },
                drawerItemStyle: {
                  backgroundColor: 'transparent',
                },
                drawerStyle: {
                  backgroundColor: Colors.light.tint,
                },
                headerTintColor: Colors.light.tint,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Drawer.Screen
                name="index"
                options={{
                  title: 'MyCoupon',
                  drawerLabel: 'Inicio',
                }}
              />
              <Drawer.Screen
                name="(validator)"
                options={{
                  title: 'Validador',
                  drawerLabel: 'Validador',
                  headerTintColor: Colors.light.tint,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerShown: false,
                }}
              />
              <Drawer.Screen
                name="coupons"
                options={{
                  title: 'MyCoupon',
                  drawerLabel: 'Cupones',
                  headerTintColor: Colors.light.tint,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />

              <Drawer.Screen
                name="management"
                options={{
                  title: 'MyCoupon',
                  drawerLabel: 'Gestión',
                  headerTintColor: Colors.light.tint,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Drawer.Screen
                name="settings"
                options={{
                  title: 'Ajustes',
                  drawerLabel: 'Ajustes',
                  headerTintColor: Colors.light.tint,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Drawer.Screen
                name="help"
                options={{
                  title: 'MyCoupon',
                  drawerLabel: 'Ayuda',
                  headerTintColor: Colors.light.tint,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </Drawer>
          </GestureHandlerRootView>
        </ThemeProvider>
      </AuthProvider>
    );
  } else {
    return <Redirect href="/sign-in" />;
  }
}
