import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Alert,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import InputWithLabel from '@/components/InputWithLabel';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import AuthApi from '@/api/AuthApi';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  const [userData, setUserData] = useState({ username: '', password: '' });

  const handleSubmit = async () => {
    if (userData.username !== '' && userData.password !== '') {
      const data = await AuthApi.login(userData);
      console.log(data);
      SecureStore.setItemAsync('accessToken', data.accessToken);
      SecureStore.setItemAsync('refreshToken', data.refreshToken);
    } else {
      Alert.alert('Atención', 'Por favor, rellene todos los campos');
    }
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
              MyCoupon
            </ThemedText>
          </View>

          <View style={styles.formCard}>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Iniciar Sesión
            </ThemedText>
            <View>
              <InputWithLabel
                label="USUARIO"
                icon={'user'}
                onChange={(text: string) =>
                  setUserData({ ...userData, username: text })
                }
                value={userData.username}
              />
              <InputWithLabel
                label="CONTRASEÑA"
                icon={'lock'}
                secureTextEntry
                onChange={(e: string) =>
                  setUserData({ ...userData, password: e })
                }
                value={userData.password}
              />
            </View>

            <Button title="ACCEDER" onPress={handleSubmit} />
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
    margin: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderRadius: 10,
    minHeight: 300,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
