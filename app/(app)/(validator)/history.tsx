import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import CouponApi from '@/api/coupon';
import CouponList from '@/components/CouponList';
import Loader from '@/components/Loader';
import { useIsFocused } from '@react-navigation/native';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState<Array<ICoupon>>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const couponsFetch = await CouponApi.getCouponsValidatedBy();
        setIsLoading(false);
        if (couponsFetch.length > 0) {
          setCoupons(couponsFetch);
        } else {
          setCoupons([]);
        }
      } catch (e) {
        setIsLoading(false);
        Alert.alert('Error', 'No se pudieron cargar los cupones');
      }
    };
    getCoupons();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && <CouponList coupons={coupons} historyView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    width: '100%',
  },
});
