import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RestaurantApi from '@/api/restaurants';
import RestaurantDropdownHeader from '@/components/RestaurantDropdownHeader';

export default function Management() {
  const [restaurants, setRestaurants] = useState<any>([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestaurantApi.getRestaurants();
        if (response.error) {
          throw new Error(response.error);
        }
        const restaurants: any = response.response.restaurants.map(
          (element: any) => {
            return { ...element, isOpened: false };
          }
        );
        console.log(restaurants);

        setRestaurants(restaurants);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRestaurants();
  }, []);

  const handleRestaurantOpen = (id: number) => {
    const updatedRestaurants = restaurants?.map((restaurant: any) => {
      if (restaurant._id === id) {
        return { ...restaurant, isOpened: !restaurant.isOpened };
      }
      return restaurant;
    });
    setRestaurants(updatedRestaurants);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {restaurants &&
          restaurants.map((restaurant: any) => (
            <View style={styles.restaurantWrapper}>
              <RestaurantDropdownHeader
                restaurantName={restaurant.name}
                city={restaurant.city}
                code={restaurant.code}
                onPress={() => handleRestaurantOpen(restaurant._id)}
                onEditPress={() => {
                  /**Handle edit press */
                }}
                key={restaurant._id}
              />
              {restaurant.isOpened && (
                <View>
                  <Text>Some content</Text>
                </View>
              )}
            </View>
          ))}
      </ScrollView>
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  restaurantWrapper: {
    width: '100%',
    marginBottom: 10,
  },
});
