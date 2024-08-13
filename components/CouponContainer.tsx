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

export default function CouponContainer({
  date,
  couponsInADay,
  handleSelected,
  setEditMode,
  isEditMode,
  selectedCoupons,
}: {
  date: string;
  couponsInADay: Array<ICoupon>;
  handleSelected?: (id: string) => void;
  setEditMode?: () => void;
  isEditMode?: boolean;
  selectedCoupons?: Set<string>;
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
    outputRange: [0, couponsInADay.length * 100], // Ajusta el valor para obtener la altura correcta
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
      </TouchableOpacity>
      <Animated.View style={[styles.couponContainer, { maxHeight }]}>
        {/** Coupons */}
        <FlatList
          data={couponsInADay}
          numColumns={4}
          renderItem={({ item }) => (
            <CouponCard
              key={item._id}
              coupon={item}
              handleSelected={handleSelected}
              isEditMode={isEditMode}
              setEditMode={setEditMode}
              isSelected={false}
            />
          )}
          keyExtractor={(item) => item._id}
          initialNumToRender={10}
          scrollEnabled={false}
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
