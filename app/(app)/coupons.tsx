import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import CouponApi from '@/api/coupon';

interface ICoupon {
  title: String;
  description: String;
  valid_from: Date;
  valid_until: Date;
  terms: String;
  status: String;
  created_at: Date;
  validated_by: String;
  is_valid_at: Array<String>;
  redeemed_at: Date;
  created_by: String;
  redeemed_date: Date;
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<Array<ICoupon>>([]);

  useEffect(() => {
    console.log('Getting coupons');
    const coupons = await CouponApi.getCoupons().then((response) => {
      setCoupons(response.data);
    });
  }, []);

  useEffect(() => {
    if (coupons) Alert.alert('Coupon', JSON.stringify(coupons[0]));
  }, [coupons]);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Button
            title="GENERAR CUPONES"
            onPress={() => {
              console.log('Create coupon pressed');
            }}
            bgcolor="#fff"
            borderColor={Colors.light.tint}
            textColor={Colors.light.tint}
            borderRadius={11}
          />
        </View>
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
