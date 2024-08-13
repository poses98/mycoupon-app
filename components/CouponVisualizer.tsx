import React, { useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import QRCode from 'react-qr-code';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import { CouponStatus } from '@/enums/CouponStatus';
import { AntDesign } from '@expo/vector-icons';
import Button from './Button';

export default function CouponVisualizer({ coupon }: { coupon: ICoupon }) {
  const redeemed = coupon.status === CouponStatus.REDEEMED;
  const statusText = redeemed ? 'CANJEADO' : 'NO CANJEADO';
  const memoizedQRCode = useMemo(() => {
    return <QRCode value={coupon._id} size={50} />;
  }, [coupon._id]);
  console.log('Rendering coupon');

  return (
    <View style={styles.container}>
      <View>
        <AntDesign
          name="dropbox"
          size={24}
          color={Colors.light.redeemedCoupon}
        />
      </View>
      <ThemedText
        type="subtitle"
        style={redeemed ? styles.redeemedText : styles.notRedeemedText}
      >
        {statusText}
      </ThemedText>
      {memoizedQRCode}
      <ThemedText type="form-label">{coupon._id}</ThemedText>
      <ThemedText type="defaultSemiBold">{coupon.title}</ThemedText>
      <ThemedText type="default">{coupon.description}</ThemedText>
      <ThemedText type="form-label">Evento:</ThemedText>
      <ThemedText type="default">{coupon.event}</ThemedText>
      <Button title="COMPARTIR" onPress={() => console.log('COMPARTIR')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'column',
  },
  redeemedText: { color: Colors.light.redeemedCoupon },
  notRedeemedText: { color: Colors.light.tint },
});
