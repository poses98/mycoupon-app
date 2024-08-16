import CustomModal from '@/components/CustomModal';
import FormChangePassword from '@/components/FormChangePassword';
import LogoutButton from '@/components/LogoutButton';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

export default function Settings() {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.menuOption}
          onPress={() => setIsChangePasswordVisible(true)}
        >
          <Text>Cambiar contraseña</Text>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
        <LogoutButton color />
        <ThemedText
          type="form-label"
          style={{
            color: 'rgba(0,0,0,0.4)',
            width: '100%',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {process.env.EXPO_PUBLIC_APP_VERSION} by Pablo Osés
        </ThemedText>
        <CustomModal
          isVisible={isChangePasswordVisible}
          onClose={() => setIsChangePasswordVisible(false)}
          title="Cambiar contraseña"
          isForm
        >
          <FormChangePassword
            onClose={() => {
              setIsChangePasswordVisible(false);
            }}
          />
        </CustomModal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
