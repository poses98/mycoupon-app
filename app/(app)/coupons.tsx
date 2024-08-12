import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import CouponApi from '@/api/coupon';
import ICoupon from '@/interfaces/ICoupon';
import Loader from '@/components/Loader';
import CouponContainer from '@/components/CouponContainer';
import CustomModal from '@/components/CustomModal';
import CreateCouponForm from '@/components/CreateCouponForm';

export default function Coupons() {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState<Array<ICoupon>>([]);
  const [couponsByDate, setCouponsByDate] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getCoupons = async () => {
      const couponsFetch = await CouponApi.getCoupons();
      if (couponsFetch.length > 0) {
        setIsLoading(false);
        setCoupons(couponsFetch);
      }
    };
    getCoupons();
  }, []);

  useEffect(() => {
    if (coupons.length > 0) {
      const couponDate: { [date: string]: Array<ICoupon> } = {};
      coupons.forEach((coupon) => {
        const date = coupon.created_at.toString().split('T')[0];
        if (!couponDate[date]) {
          couponDate[date] = [];
        }
        couponDate[date].push(coupon);
      });
      setCouponsByDate(couponDate);
    }
  }, [coupons]);

  const handleModalVisibility = (visible: boolean | null) => {
    if (typeof visible === 'boolean') {
      setIsModalVisible(visible);
      return;
    }
    setIsModalVisible((prevState) => !prevState);
  };

  const handleFormSubmit = (formData: {
    name: string;
    description: string;
    valid_from: Date;
    valid_until: Date;
    quantity: number;
  }) => {
    console.log(formData);
  };

  return (
    <View style={styles.wrapper}>
      {isLoading && <Loader />}
      {!isLoading && coupons.length > 0 && (
        <ScrollView contentContainerStyle={styles.container}>
          <Button
            title="GENERAR CUPONES"
            onPress={() => handleModalVisibility(true)}
            bgcolor="#fff"
            borderColor={Colors.light.tint}
            textColor={Colors.light.tint}
            borderRadius={11}
            marginVertical={10}
          />
          <CustomModal
            title="Crear cupón"
            isVisible={isModalVisible}
            onClose={() => handleModalVisibility(false)}
          >
            <CreateCouponForm onSubmit={handleFormSubmit} />
          </CustomModal>
          {Object.entries(couponsByDate).map(([date, couponsInADay]: any) => (
            <CouponContainer
              key={date}
              date={date}
              couponsInADay={couponsInADay}
            />
          ))}
        </ScrollView>
      )}
      {!isLoading && coupons.length === 0 && (
        <View>
          <Text>No hay cupones</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 14,
    justifyContent: 'center',
  },
  couponContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: Colors.light.inputTextBackground,
    borderRadius: 11,
    marginBottom: 4,
  },
});
