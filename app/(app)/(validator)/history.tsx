import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import CouponApi from '@/api/coupon';
import CouponList from '@/components/CouponList';
import Loader from '@/components/Loader';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState<Array<ICoupon>>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
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
    if (isFocused) getCoupons();
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <Loader />}
      {!isLoading && <CouponList coupons={coupons} historyView />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 14,
    justifyContent: 'center',
  },
});
