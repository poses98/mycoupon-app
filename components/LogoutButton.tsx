import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const LogoutButton = ({ color }: { color?: boolean }) => {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity
      style={[
        styles.logoutContainer,
        { borderColor: color ? Colors.light.tint : 'white' },
      ]}
      onPress={async () => {
        await signOut();
        router.navigate('/sign-in');
      }}
    >
      <Text
        style={[
          styles.logoutText,
          { color: color ? Colors.light.tint : 'white' },
        ]}
      >
        Cerrar Sesión
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutContainer: {
    width: '90%',
    margin: 'auto',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default LogoutButton;
