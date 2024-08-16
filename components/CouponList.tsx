import { useCallback, useEffect, useState, useMemo } from 'react';
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
  const [couponsByDate, setCouponsByDate] = useState<Record<string, any>>({});
  const [showingCoupon, setShowingCoupon] = useState<ICoupon | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const couponsById = useMemo(() => {
    return coupons.reduce((map, coupon) => {
      map[coupon._id] = coupon;
      return map;
    }, {} as Record<string, ICoupon>);
  }, [coupons]);

  const memoizedCouponsByDate = useMemo(() => {
    const couponDate: {
      [date: string]: {
        coupons: Array<ICoupon>;
        redeemed: number;
        not_redeemed: number;
      };
    } = {};

    coupons.forEach((coupon) => {
      const date = !historyView
        ? coupon.created_at.toString().split('T')[0]
        : coupon.redeemed_date.toString().split('T')[0];

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

    return couponDate;
  }, [coupons, historyView]);

  useEffect(() => {
    setCouponsByDate(memoizedCouponsByDate);
  }, [memoizedCouponsByDate]);

  const onPressCouponCard = useCallback(
    (id: string) => {
      setShowingCoupon(couponsById[id]); // Instant lookup
      setIsModalVisible(true);
    },
    [couponsById]
  );

  const handleModalVisibility = useCallback((visible: boolean | null) => {
    if (typeof visible === 'boolean') {
      setIsModalVisible(visible);
      return;
    }
    setIsModalVisible((prevState) => !prevState);
  }, []);

  const memoizedCouponEntries = useMemo(() => {
    return coupons.length > 0 ? Object.entries(couponsByDate) : [];
  }, [coupons.length, couponsByDate]);

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
        <CouponVisualizer coupon={showingCoupon} />
      </CustomModal>
      {coupons.length === 0 ? (
        <Text style={{}}>No hay cupones</Text>
      ) : (
        memoizedCouponEntries.map(([date, couponsInADay]: any) => (
          <CouponContainer
            key={date}
            date={date}
            couponsInADay={couponsInADay.coupons}
            activeCoupons={couponsInADay.not_redeemed}
            redeemedCoupons={couponsInADay.redeemed}
            onPressCouponCard={onPressCouponCard}
            historyView={historyView}
          />
        ))
      )}
    </View>
  );
}
