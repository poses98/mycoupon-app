import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import QRCode from 'react-qr-code';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import { CouponStatus } from '@/enums/CouponStatus';
import Button from './Button';
import { getFormattedDate, getFormattedTime } from '@/utils/dateUtils';
import { ShareableCard } from './ShareableCard';
import CouponApi from '@/api/coupon';

export default function CouponVisualizer({
  coupon,
  onShare,
}: {
  coupon?: ICoupon;
  onShare?: (id: string) => void;
}) {
  if (!coupon) {
    return <></>;
  }
  const [sharing, setSharing] = useState(false);
  const redeemed = coupon.status === CouponStatus.REDEEMED;
  const statusText = redeemed ? 'CANJEADO' : 'NO CANJEADO';
  const redeemedDate = redeemed ? new Date(coupon.redeemed_date) : null;
  const memoizedQRCode = useMemo(() => {
    return <QRCode value={coupon.token} size={180} />;
  }, [coupon._id]);

  const handleShare = async () => {
    setSharing(true);
    try {
      const result = await CouponApi.setSharedCoupon({ couponId: coupon._id });

      if (result && onShare) {
        setTimeout(() => {
          onShare(coupon._id);
        }, 1000);
      } else {
        throw new Error('Error al compartir el cupón');
      }
    } catch (e) {
      Alert.alert('Error', 'Error al compartir el cupón');
    }
  };

  return (
    <>
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
          <ThemedText type="form-label" style={styles.headerText}>
            Evento
          </ThemedText>
          <ThemedText type="defaultSemiBold">{coupon.event}</ThemedText>
          {coupon.status === CouponStatus.REDEEMED && redeemed && (
            <View
              style={[
                {
                  width: '70%',
                  borderRadius: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <ThemedText type="form-label" style={styles.headerText}>
                Canjeado el día
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {`${getFormattedDate(redeemedDate) || ''} a las ${
                  getFormattedTime(redeemedDate) || ''
                }`}
              </ThemedText>
              <ThemedText type="form-label" style={styles.headerText}>
                Validado por
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {coupon.validated_by.name || 'No disponible'}
              </ThemedText>
              <ThemedText type="form-label" style={styles.headerText}>
                Restaurante
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {coupon.redeemed_at.code || 'No disponible'}
              </ThemedText>
            </View>
          )}
        </View>
        {coupon.status === CouponStatus.NOT_REDEEMED && (
          <Button
            title={coupon.shared ? 'COMPARTIR DE NUEVO' : 'COMPARTIR'}
            onPress={handleShare}
            bgcolor={
              coupon.shared
                ? Colors.light.redeemedBg
                : Colors.light.buttonYellow
            }
            textColor={coupon.shared ? 'white' : Colors.light.tint}
          />
        )}
      </View>
      {sharing && <ShareableCard coupon={coupon} />}
    </>
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
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  redeemedText: { color: Colors.light.redeemedCoupon, marginVertical: 10 },
  notRedeemedText: { color: Colors.light.tint, marginVertical: 10 },
  infoContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    lineHeight: 40,
    color: Colors.light.tint,
  },
  description: {
    fontSize: 17,
    textAlign: 'left',
    marginVertical: 10,
    fontWeight: '600',
  },
  headerText: {
    textTransform: 'uppercase',
    lineHeight: 20,
  },
});
