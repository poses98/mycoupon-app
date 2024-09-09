import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';

interface IEmployeeCard {
  employee: string;
}

export default function EmployeeCard({ employee }: IEmployeeCard) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          {/**Maybe change this to use an icon */}
          <Image
            source={require('@/assets/images/employee.png')}
            style={styles.image}
          />
        </View>
        <ThemedText type="defaultSemiBold">
          {employee || 'Employee Name required'}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {},
  image: {},
});
