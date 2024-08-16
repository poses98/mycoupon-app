import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  FlatList,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import ICoupon from '@/interfaces/ICoupon';
import CouponCard from '@/components/CouponCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { act } from 'react-test-renderer';

export default function CouponContainer({
  date,
  couponsInADay,
  handleSelected,
  setEditMode,
  isEditMode,
  selectedCoupons,
  onPressCouponCard,
  activeCoupons,
  redeemedCoupons,
  historyView,
}: {
  date: string;
  couponsInADay: Array<ICoupon>;
  handleSelected?: (id: string) => void;
  setEditMode?: () => void;
  isEditMode?: boolean;
  selectedCoupons?: Set<string>;
  onPressCouponCard: (id: string) => void;
  activeCoupons?: number;
  redeemedCoupons?: number;
  historyView?: boolean;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));

  const handleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpened((prevState) => !prevState);

    Animated.timing(heightAnim, {
      toValue: isOpened ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      couponsInADay.length * 100 > 150 ? couponsInADay.length * 100 : 150,
    ],
  });

  return (
    <View
      key={date}
      style={{
        marginTop: 4,
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <TouchableOpacity style={styles.dateBar} onPress={handleOpen}>
        <AntDesign
          name={isOpened ? 'caretdown' : 'caretright'}
          size={12}
          color={Colors.light.dateCoupon}
        />
        <ThemedText
          type="defaultSemiBold"
          style={{
            fontStyle: 'italic',
            color: Colors.light.dateCoupon,
            marginLeft: 4,
          }}
        >
          {date}
        </ThemedText>
        {activeCoupons !== undefined &&
          redeemedCoupons !== undefined &&
          !historyView && (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                paddingHorizontal: 20,
              }}
            >
              <ThemedText
                type="default"
                style={{
                  marginLeft: 4,
                  color: Colors.light.activeCoupon,
                  fontSize: 12,
                }}
              >
                {`ACTIVOS(${activeCoupons})`}
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  marginLeft: 4,
                  color: Colors.light.redeemedBg,
                  fontSize: 12,
                }}
              >
                {`CANJEADOS(${redeemedCoupons})`}
              </ThemedText>
            </View>
          )}
      </TouchableOpacity>
      <Animated.View style={[styles.couponContainer, { maxHeight }]}>
        {/** Coupons */}
        <FlatList
          data={couponsInADay}
          numColumns={4}
          renderItem={({ item }) => (
            <CouponCard
              coupon={item}
              handleSelected={handleSelected}
              onPress={onPressCouponCard}
              isSelected={false}
              historyView={historyView}
            />
          )}
          keyExtractor={(item) => item._id}
          initialNumToRender={28}
          scrollEnabled={false}
          getItemLayout={(data, index) => ({
            length: 110, // or the height of your item
            offset: 100 * index,
            index,
          })}
        />
      </Animated.View>
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
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    margin: 'auto',
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderRadius: 11,
    marginBottom: 4,
    borderBottomColor: Colors.light.separatorLine,
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
});
