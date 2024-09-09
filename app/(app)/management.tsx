import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RestaurantApi from '@/api/restaurants';

export default function Management() {
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestaurantApi.getRestaurants();
        console.log(response.response.restaurants);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
});
