import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

interface RestaurantDropdownHeaderProps {
  restaurantName: string;
  city: string;
}

export default function RestaurantDropdownHeader({
  restaurantName,
  city,
}: RestaurantDropdownHeaderProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };
  return (
    <TouchableOpacity style={styles.dropdownContainer} onPress={handleOpen}>
      <AntDesign
        name={isOpened ? 'caretdown' : 'caretright'}
        size={12}
        color={Colors.light.dateCoupon}
      />
      <View>
        <ThemedText
          type="default"
          style={{
            color: Colors.light.dateCoupon,
          }}
        >
          {city}
        </ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{
            color: Colors.light.dateCoupon,
          }}
        >
          {restaurantName}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
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
