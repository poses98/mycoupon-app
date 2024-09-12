import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RestaurantApi from '@/api/restaurants';
import RestaurantDropdownHeader from '@/components/RestaurantDropdownHeader';
import Loader from '@/components/Loader';
import { AntDesign } from '@expo/vector-icons';
import RestaurantOptionButton from '@/components/RestaurantOptionButton';

export default function Management() {
  const [restaurants, setRestaurants] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [restaurantId, setRestaurantId] = useState('');
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

  const handleRestaurantPasswordChange = (id: string) => {
    setRestaurantId(id);
    setSelectedOption('password_change');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {restaurants !== null &&
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
                <View style={styles.optionBox}>
                  <RestaurantOptionButton
                    buttonText="Gestionar empleados"
                    onPress={() => console.log('Option button pressed')}
                  />
                  <RestaurantOptionButton
                    buttonText="Gestionar restaurante"
                    onPress={() => console.log('Option button pressed')}
                  />
                  <RestaurantOptionButton
                    buttonText="Mostrar cupones canjeados en este restaurante"
                    onPress={() => console.log('Option button pressed')}
                  />
                  <RestaurantOptionButton
                    buttonText="Cambiar contraseña"
                    onPress={() =>
                      handleRestaurantPasswordChange(restaurant._id)
                    }
                  />
                </View>
              )}
            </View>
          ))}
        {restaurants === null && <Loader />}
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
  optionBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 5,
  },
});
