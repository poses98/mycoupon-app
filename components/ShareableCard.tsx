import React, { useMemo } from 'react';
import ICoupon from '@/interfaces/ICoupon';
import { getFormattedDate } from '@/utils/dateUtils';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-qr-code';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

export const ShareableCard = ({ coupon }: { coupon: ICoupon }) => {
  const memoizedQRCode = useMemo(() => {
    return (
      <QRCode
        value={coupon._id}
        size={180}
        fgColor={Colors.light.buttonYellow}
        bgColor={Colors.light.tint}
      />
    );
  }, [coupon._id]);
  const valid_from = new Date(coupon.valid_from);
  const valid_until = new Date(coupon.valid_until);
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/mcd_logo.svg')}
        style={styles.imageContainer}
        contentFit="contain"
      />
      <ThemedText type="title" style={styles.title}>
        Disfruta de la experiencia McDonald's
      </ThemedText>

      <ThemedText type="default" style={styles.subtitle}>
        Queremos regalarte un/a
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
          {'\n'}
          {coupon.title}
          {'\n'}
        </Text>
        para disfrutarlo con quien tu elijas.
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.description}>
        {coupon.description}
      </ThemedText>
      <View style={styles.qrcontainer}>{memoizedQRCode}</View>
      <Text style={styles.terms}>
        Cupón canjebale en tus restaurantes McDonald's de Navarra y Andoain
        desde el {getFormattedDate(valid_from)} hasta el{' '}
        {getFormattedDate(valid_until)}. No acumulable a otras ofertas y/o
        promoción. No válido para pedidos de McDelivery ni quioscos de venta.
        Consultar con el encargado.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  qrcontainer: {
    marginVertical: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 19,
    marginVertical: 10,
    fontWeight: 'normal',
    color: 'white',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  terms: {
    fontSize: 12,
    color: 'white',
    textAlign: 'justify',
    marginVertical: 20,
  },
});
