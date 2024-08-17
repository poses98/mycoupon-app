import MenuCard from '@/components/MenuCard';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <MenuCard
          icon={require('@/assets/icons/codigo-qr.png')}
          title="VALIDAR"
          onClick={() => {
            router.navigate('/validator');
          }}
        />
        <MenuCard
          icon={require('@/assets/icons/voucher.png')}
          title="CUPONES"
          onClick={() => {
            router.navigate('/coupons');
          }}
        />
        <MenuCard
          icon={require('@/assets/icons/change-management.png')}
          title="GESTIÓN"
          onClick={() => {
            router.navigate('/management');
          }}
        />
        <MenuCard
          icon={require('@/assets/icons/settings.png')}
          title="AJUSTES"
          onClick={() => {
            router.navigate('/settings');
          }}
        />
        <MenuCard
          icon={require('@/assets/icons/question.png')}
          title="AYUDA"
          onClick={() => {
            router.navigate('/help');
          }}
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
