import MenuCard from '@/components/MenuCard';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <MenuCard
          icon={require('@/assets/icons/qr-code.png')}
          title="VALIDAR"
          onClick={() => {}}
        />
        <MenuCard
          icon={require('@/assets/icons/voucher.png')}
          title="CUPONES"
          onClick={() => {}}
        />
        <MenuCard
          icon={require('@/assets/icons/change-management.png')}
          title="GESTIÓN"
          onClick={() => {}}
        />
        <MenuCard
          icon={require('@/assets/icons/question.png')}
          title="AYUDA"
          onClick={() => {}}
        />
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
});
