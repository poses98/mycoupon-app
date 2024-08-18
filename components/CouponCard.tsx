import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import { CouponStatus } from '@/enums/CouponStatus';
import { AntDesign } from '@expo/vector-icons';
import { getFormattedTime } from '../utils/dateUtils';
import { Image } from 'expo-image';

const CouponCard = React.memo(
  ({
    coupon,
    handleSelected,
    onPress,
    isSelected,
    historyView,
  }: {
    coupon: ICoupon;
    handleSelected?: (id: string) => void;
    onPress: (id: string) => void;
    isSelected?: boolean;
    historyView?: boolean;
  }) => {
    const redeemedDate = new Date(coupon.redeemed_date);
    const redeemedHourStr = getFormattedTime(redeemedDate);
    return (
      <TouchableOpacity
        key={coupon._id}
        style={[
          styles.couponCard,
          coupon.status === CouponStatus.NOT_REDEEMED
            ? !historyView
              ? styles.activeCoupon
              : {}
            : !historyView
            ? styles.redeemedCoupon
            : {},
          isSelected ? styles.selected : {},
        ]}
        onPress={() => {
          onPress(coupon._id);
        }}
      >
        {isSelected && (
          <View style={styles.selectedBadge}>
            <AntDesign name="check" size={20} color={Colors.light.selected} />
          </View>
        )}
        {coupon.shared &&
          !isSelected &&
          coupon.status !== CouponStatus.REDEEMED && (
            <View style={styles.sharedBadge}>
              <AntDesign
                name="sharealt"
                size={15}
                color={Colors.light.validBg}
              />
            </View>
          )}
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
          <Image
            source={require('@/assets/icons/qr-code100x100.png')}
            style={styles.icon}
            contentFit="contain"
          />
          <ThemedText type="form-label" style={styles.couponIdText}>
            {coupon._id}
          </ThemedText>
        </View>
        {historyView && (
          <ThemedText type="form-label">{redeemedHourStr}</ThemedText>
        )}

        {
          <Text
            style={[
              styles.couponTitle,
              coupon.status === CouponStatus.REDEEMED ? styles.lowOpacity : {},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {coupon.title}
          </Text>
        }
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  couponCard: {
    width: '22%',
    backgroundColor: 'white',
    minHeight: 110,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1.4,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 8,
  },
  icon: { width: 50, height: 50 },
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
  selected: {
    borderColor: Colors.light.selected,
    borderWidth: 1.6,
  },
  selectedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 50,
    backgroundColor: 'white',
    borderColor: Colors.light.selected,
    borderWidth: 1.6,
    zIndex: 1,
  },
  sharedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 50,
    backgroundColor: 'white',
    borderColor: Colors.light.validBg,
    borderWidth: 1.6,
    padding: 2,
    zIndex: 1,
  },
});

export default CouponCard;
