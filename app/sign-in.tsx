import {
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import InputWithLabel from '@/components/InputWithLabel';
import Button from '@/components/Button';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [restaurantData, setRestaurantData] = useState({
    code: '',
    password: '',
  });
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const { signIn, restaurantSignIn } = useAuth();

  const handleSubmit = async () => {
    if (!isRestaurant) {
      if (userData.username !== '' && userData.password !== '') {
        setIsSendingForm(true);
        const signedIn = await signIn(userData.username, userData.password);
        if (signedIn) {
          router.replace('/');
        } else {
          Alert.alert('Atención', 'Usuario o contraseña incorrectos');
          setIsSendingForm(false);
        }
      } else {
        Alert.alert('Atención', 'Por favor, rellene todos los campos');
      }
    } else {
      if (restaurantData.code !== '' && restaurantData.password !== '') {
        setIsSendingForm(true);
        console.log(restaurantData);

        const signedIn = await restaurantSignIn(
          restaurantData.code,
          restaurantData.password
        );
        if (signedIn) {
          Alert.alert('Success', 'Acceso correcto');
          router.replace('/');
        } else {
          Alert.alert('Atención', 'Usuario o contraseña incorrectos');
          setIsSendingForm(false);
        }
      } else {
        Alert.alert('Atención', 'Por favor, rellene todos los campos');
      }
    }
  };

  const handleRestaurantModeChange = async () => {
    setIsRestaurant((prevState) => !prevState);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/mcd_logo.svg')}
              style={styles.logo}
              contentFit="contain"
            />
            <ThemedText
              type="title"
              style={{
                color: '#fff',
                fontSize: 48,
                lineHeight: 48,
                textAlign: 'center',
              }}
            >
              {process.env.EXPO_PUBLIC_APP_NAME}
            </ThemedText>
          </View>

          <View style={styles.formCard}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Iniciar Sesión
            </ThemedText>

            <View style={styles.formContent}>
              {isSendingForm ? (
                <ActivityIndicator size="large" color={Colors.light.tint} />
              ) : (
                <View>
                  <TouchableOpacity onPress={handleRestaurantModeChange}>
                    <ThemedText
                      type="default"
                      style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                      }}
                    >
                      {isRestaurant
                        ? 'Acceso franquiciado'
                        : 'Acceso restaurante'}
                    </ThemedText>
                  </TouchableOpacity>
                  <InputWithLabel
                    label={isRestaurant ? 'CÓDIGO RESTAURANTE' : 'USUARIO'}
                    icon={isRestaurant ? 'idcard' : 'user'}
                    onChange={(text: string) => {
                      if (!isRestaurant) {
                        setUserData({ ...userData, username: text });
                      } else {
                        setRestaurantData({ ...restaurantData, code: text });
                      }
                    }}
                    value={
                      isRestaurant ? restaurantData.code : userData.username
                    }
                    autocapitalize="none"
                  />
                  <InputWithLabel
                    label="CONTRASEÑA"
                    icon={'lock'}
                    secureTextEntry
                    onChange={(e: string) => {
                      if (!isRestaurant) {
                        setUserData({ ...userData, password: e });
                      } else {
                        setRestaurantData({ ...restaurantData, password: e });
                      }
                    }}
                    value={
                      isRestaurant ? restaurantData.password : userData.password
                    }
                    autocapitalize="none"
                  />
                </View>
              )}
            </View>
            {!isSendingForm && (
              <Button
                title="ACCEDER"
                onPress={handleSubmit}
                disabled={isSendingForm}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#004613',
    flex: 1,
  },
  logoContainer: {
    textAlign: 'center',
    marginTop: 100,
  },
  logo: {
    width: 70,
    height: 70,
    margin: 'auto',
  },
  subtitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.light.tint,
  },
  formCard: {
    width: '90%',
    marginLeft: '5%',
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderRadius: 10,
    minHeight: 300,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginTop: 35,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  formContent: {
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
