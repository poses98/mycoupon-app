import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';

const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity
      style={styles.logoutContainer}
      onPress={async () => {
        await signOut();
        router.navigate('/sign-in');
      }}
    >
      <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
