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
    return <QRCode value={coupon._id} size={180} />;
  }, [coupon._id]);

  return (
    <View style={styles.container}>
      {/*  <View>
        <AntDesign
          name="delete"
          size={24}
          color={Colors.light.redeemedCoupon}
        />
      </View> */}
      <View style={styles.imageContainer}>
        <ThemedText
          type="subtitle"
          style={redeemed ? styles.redeemedText : styles.notRedeemedText}
        >
          {statusText}
        </ThemedText>
        {memoizedQRCode}
        <ThemedText type="form-label">{coupon._id}</ThemedText>
      </View>
      <View style={styles.infoContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {coupon.title}
        </ThemedText>
        <ThemedText type="default" style={styles.description}>
          {coupon.description}
        </ThemedText>
        <ThemedText type="form-label">Evento</ThemedText>
        <ThemedText type="default">{coupon.event}</ThemedText>
      </View>

      <Button title="COMPARTIR" onPress={() => console.log('COMPARTIR')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  redeemedText: { color: Colors.light.redeemedCoupon },
  notRedeemedText: { color: Colors.light.tint },
  infoContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    lineHeight: 40,
  },
  description: {
    fontSize: 17,
    textAlign: 'left',
  },
});
