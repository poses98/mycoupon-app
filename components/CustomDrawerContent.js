import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';
import LogoutButton from './LogoutButton';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/mcd_logo.svg')}
            style={styles.image}
            contentFit="contain"
          />
          <ThemedText type="title" style={styles.drawerText}>
            {process.env.EXPO_PUBLIC_APP_NAME}
          </ThemedText>
          <ThemedText
            type="form-label"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {process.env.EXPO_PUBLIC_APP_VERSION} by Pablo Osés
          </ThemedText>
        </View>
        <DrawerItemList {...props} />
        <LogoutButton />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 0,
    height: '100%',
    display: 'flex',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  drawerText: {
    fontFamily: 'ArialRonded',
    color: '#fff',
    fontSize: 30,
  },
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

export default CustomDrawerContent;
