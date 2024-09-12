import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

interface RestaurantDropdownHeaderProps {
  restaurantName: string;
  city: string;
  code: number;
  onPress?: () => void;
  onEditPress?: () => void;
}

export default function RestaurantDropdownHeader({
  restaurantName,
  city,
  code,
  onPress,
  onEditPress,
}: RestaurantDropdownHeaderProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOnPress = () => {
    onPress && onPress();
    setIsOpened((prevState) => !prevState);
  };
  return (
    <View style={styles.dropdownWrapper}>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={handleOnPress}
      >
        <AntDesign
          name={isOpened ? 'caretdown' : 'caretright'}
          size={12}
          color={Colors.light.dateCoupon}
        />
        <View>
          <ThemedText
            type="default"
            style={[styles.headerText, { fontWeight: '300', fontSize: 14 }]}
          >
            {city}
          </ThemedText>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.headerText, { fontWeight: 'bold', fontSize: 18 }]}
          >
            {`${restaurantName} (#${code})`}
          </ThemedText>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={onEditPress}>
          <AntDesign name="edit" size={20} color={Colors.light.dateCoupon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 4,
    borderBottomColor: Colors.light.separatorLine,
    borderBottomWidth: 1,
    borderRadius: 11,
    paddingRight: 25,
    paddingBottom: 6,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  headerText: {
    color: Colors.light.dateCoupon,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
});
