import React, { useMemo } from 'react';
import ICoupon from '@/interfaces/ICoupon';
import { getFormattedDate } from '@/utils/dateUtils';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-qr-code';
import { Image } from 'expo-image';

export const ShareableCard = ({ coupon }: { coupon: ICoupon }) => {
  const memoizedQRCode = useMemo(() => {
    return <QRCode value={coupon._id} size={180} />;
  }, [coupon._id]);
  return (
    <View>
      <Text>Disfruta de la experiencia McDonald's</Text>
      <Image source={require('@/assets/images/mcd_logo.svg')} />
      <Text>
        Queremos regalarte un/a {coupon.title} para disfrutarlo con quien tu
        elijas.
      </Text>
      <Text>{coupon.description}</Text>
      {memoizedQRCode}
      <Text>
        Cupón canjebale en tus restaurantes McDonald's de Navarra y Andoain
        desde el {getFormattedDate(coupon.valid_from)} hasta el{' '}
        {getFormattedDate(coupon.valid_until)}. No acumulable a otras ofertas
        y/o promoción. No válido para pedidos de McDelivery ni quioscos de
        venta. Consultar con el encargado en caja o McAuto.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
});
