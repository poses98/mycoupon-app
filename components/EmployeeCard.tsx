import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface IEmployeeCard {
  employee: string;
}

export default function EmployeeCard({ employee }: IEmployeeCard) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <AntDesign name="user" size={24} color={Colors.light.icon} />
        </View>
        <ThemedText type="defaultSemiBold">{employee || 'None'}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    elevation: 2,
  },
});
