import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ICoupon from '@/interfaces/ICoupon';
import CouponContainer from './CouponContainer';
import { CouponStatus } from '@/enums/CouponStatus';
import CustomModal from './CustomModal';
import CouponVisualizer from './CouponVisualizer';

export default function CouponList({
  coupons,
  historyView,
}: {
  coupons: Array<ICoupon>;
  historyView?: boolean;
}) {
  const [couponsByDate, setCouponsByDate] = useState<any>([]);
  const [showingCoupon, setShowingCoupon] = useState<ICoupon | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (coupons.length > 0) {
      const couponDate: {
        [date: string]: {
          coupons: Array<ICoupon>;
          redeemed: number;
          not_redeemed: number;
        };
      } = {};
      coupons.forEach((coupon) => {
        const date = coupon.created_at.toString().split('T')[0];
        if (!couponDate[date]) {
          couponDate[date] = {
            coupons: [],
            redeemed: 0,
            not_redeemed: 0,
          };
        }
        if (coupon.status === CouponStatus.REDEEMED) {
          couponDate[date].redeemed++;
        } else {
          couponDate[date].not_redeemed++;
        }
        couponDate[date].coupons.push(coupon);
      });
      setCouponsByDate(couponDate);
    }
  }, [coupons]);

  const onPressCouponCard = (id: string) => {
    setShowingCoupon(coupons.filter((coupon) => coupon._id == id)[0]);
    setIsModalVisible(true);
  };

  const handleModalVisibility = (visible: boolean | null) => {
    if (typeof visible === 'boolean') {
      setIsModalVisible(visible);
      return;
    }
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <View style={{ width: '100%' }}>
      <CustomModal
        title={'Cupón'}
        isVisible={isModalVisible}
        onClose={() => {
          handleModalVisibility(false);
        }}
        height
      >
        {showingCoupon !== undefined && (
          <CouponVisualizer coupon={showingCoupon} />
        )}
      </CustomModal>
      {/**TODO center this text on screen */}
      {coupons.length === 0 && <Text>No hay cupones</Text>}
      {coupons.length > 0 &&
        Object.entries(couponsByDate).map(([date, couponsInADay]: any) => (
          <CouponContainer
            key={date}
            date={date}
            couponsInADay={couponsInADay.coupons}
            activeCoupons={couponsInADay.not_redeemed}
            redeemedCoupons={couponsInADay.redeemed}
            onPressCouponCard={onPressCouponCard}
            historyView={historyView}
          />
        ))}
    </View>
  );
}
