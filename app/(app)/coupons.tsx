import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import CouponApi from '@/api/coupon';
import ICoupon from '@/interfaces/ICoupon';
import Loader from '@/components/Loader';
import CouponContainer from '@/components/CouponContainer';
import CustomModal from '@/components/CustomModal';
import CreateCouponForm from '@/components/CreateCouponForm';
import EditModeBar from '@/components/EditModeBar';
import CouponVisualizer from '@/components/CouponVisualizer';
import { CouponStatus } from '@/enums/CouponStatus';
import CouponList from '@/components/CouponList';

export default function Coupons() {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState<Array<ICoupon>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [modalContent, setModalContent] = useState<ICoupon | undefined>(
    undefined
  );

  const handleCouponPress = useCallback((couponId: string) => {
    const selectedCoupon = coupons.find((coupon) => coupon._id === couponId);
    setModalContent(selectedCoupon);
    setIsModalVisible(true);
  }, []);

  useEffect(() => {
    const getCoupons = async () => {
      const couponsFetch = await CouponApi.getCoupons();
      if (couponsFetch.length > 0) {
        setCoupons(couponsFetch);
      }
      setIsLoading(false);
    };
    getCoupons();
  }, []);

  const handleModalVisibility = (visible: boolean | null) => {
    if (typeof visible === 'boolean') {
      setIsModalVisible(visible);
      return;
    }
    setIsModalVisible((prevState) => !prevState);
  };

  const handleFormSubmit = async (formData: {
    name: string;
    description: string;
    valid_from: Date;
    valid_until: Date;
    quantity: number;
    event?: string;
  }) => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.valid_from ||
      !formData.valid_until ||
      !formData.quantity
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    setIsSubmittingForm(true);
    const payload = {
      title: formData.name,
      description: formData.description,
      valid_from: formData.valid_from,
      valid_until: formData.valid_until,
      event: formData.event || 'GENERAL',
      quantity: 1,
    };

    if (formData.quantity >= 1) {
      payload.quantity = formData.quantity;
      try {
        const freshCoupons = await CouponApi.generateBatchCoupons(payload);
        setIsSubmittingForm(false);

        if (!freshCoupons) {
          Alert.alert('Error', 'No se pudo generar los cupones');
          return;
        } else {
          if (coupons.length > 0) {
            setCoupons([...freshCoupons, ...coupons]);
          } else {
            setCoupons(freshCoupons);
          }
          handleModalVisibility(false);
        }
      } catch (e) {
        setIsSubmittingForm(false);
        Alert.alert('Error', 'No se pudo generar los cupones');
        console.log(e);
      }
    } else {
      setIsSubmittingForm(false);
      Alert.alert('Error', 'La cantidad de cupones debe ser mayor a 0');
    }
  };

  return (
    <View style={styles.wrapper}>
      {isLoading && <Loader />}
      <EditModeBar
        closeEditMode={() => setIsEditMode(false)}
        isEditMode={isEditMode}
      />
      {!isLoading && (
        <ScrollView contentContainerStyle={styles.container}>
          <Button
            title="GENERAR CUPONES"
            onPress={() => {
              handleModalVisibility(true);
            }}
            bgcolor="#fff"
            borderColor={Colors.light.tint}
            textColor={Colors.light.tint}
            borderRadius={11}
            marginVertical={10}
          />
          <CustomModal
            title={'Crear Cupón'}
            isVisible={isModalVisible}
            onClose={() => {
              handleModalVisibility(false);
            }}
            isForm
          >
            <CreateCouponForm
              onSubmit={handleFormSubmit}
              isSubmittingForm={isSubmittingForm}
            />
          </CustomModal>
          {/*   <CustomModal
            title={'View Coupon'}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <CouponVisualizer coupon={modalContent} />
          </CustomModal> */}
          <CouponList coupons={coupons} />
        </ScrollView>
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
