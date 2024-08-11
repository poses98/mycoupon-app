import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import QRCode from 'react-qr-code';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { CouponStatus } from '@/enums/CouponStatus';

const CouponCard = React.memo(({ coupon }: { coupon: ICoupon }) => {
  return (
    <TouchableOpacity
      key={coupon._id}
      style={[
        styles.couponCard,
        coupon.status === CouponStatus.NOT_REDEEMED
          ? styles.activeCoupon
          : styles.redeemedCoupon,
      ]}
      onPress={() => {
        console.log(`Coupon ${coupon._id} pressed`);
      }}
    >
      <View
        style={[
          coupon.status === CouponStatus.REDEEMED ? styles.lowOpacity : {},
          {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {/**QR Code */}
        <QRCode value={coupon._id} size={50} />
        {/**UID */}
        <ThemedText type="form-label" style={styles.couponIdText}>
          {coupon._id}
        </ThemedText>
      </View>
      {/**Title */}
      <Text
        style={[
          styles.couponTitle,
          coupon.status === CouponStatus.REDEEMED ? styles.lowOpacity : {},
        ]}
      >
        {coupon.title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  couponCard: {
    width: '22%',
    backgroundColor: 'white',
    minHeight: 122,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 8,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1.4,
  },
  couponIdText: {
    fontSize: 5,
    color: Colors.light.tint,
  },
  couponTitle: {
    fontSize: 12,
    color: Colors.light.tint,
    textAlign: 'center',
  },
  activeCoupon: {
    borderColor: Colors.light.activeCoupon,
  },
  redeemedCoupon: {
    borderColor: Colors.light.redeemedCoupon,
  },
  lowOpacity: {
    opacity: 0.3,
  },
});

export default CouponCard;
