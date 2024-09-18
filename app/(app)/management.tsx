import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import RestaurantApi from '@/api/restaurants';
import RestaurantDropdownHeader from '@/components/RestaurantDropdownHeader';
import Loader from '@/components/Loader';
import RestaurantOptionButton from '@/components/RestaurantOptionButton';
import CustomModal from '@/components/CustomModal';
import FormChangePassword from '@/components/FormChangePassword';
import UpdateRestaurant from '@/components/UpdateRestaurant';
import CouponApi from '@/api/coupon';
import CouponList from '@/components/CouponList';

interface IModalContent {
  title: string;
  content: React.ReactNode;
}

export default function Management() {
  const [restaurants, setRestaurants] = useState<any>(null);
  const [modalContent, setModalContent] = useState<IModalContent>({
    title: '',
    content: null,
  });
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

  const handleModalClose = () => {
    setModalContent({ title: '', content: null });
  };

  const handleRestaurantUpdatePress = (id: string) => {
    const restaurant = restaurants?.find(
      (restaurant: any) => restaurant._id === id
    );
    setModalContent({
      title: restaurant.name,
      content: (
        <UpdateRestaurant
          restaurant={restaurant}
          isSubmittingForm={false}
          onSubmit={handleModalClose}
        />
      ),
    });
  };

  const handleCouponsPress = async (id: string) => {
    const restaurant = restaurants?.find(
      (restaurant: any) => restaurant._id === id
    );
    setModalContent({
      title: `Cupones canjeados en ${restaurant?.name}`,
      content: <Loader />,
    });
    const couponsFetched = await CouponApi.getValidatedCouponsByRestaurant(
      restaurant._id
    );
    if (couponsFetched.error) {
      Alert.alert('Error', 'No se pudieron obtener los cupones');
    }

    setModalContent({
      title: `Cupones canjeados en ${restaurant?.name}`,
      content: (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 40,
          }}
        >
          <CouponList coupons={couponsFetched} historyView />
        </ScrollView>
      ),
    });
  };

  const handleEmployeeManagementPress = (id: string) => {
    const restaurant = restaurants?.find(
      (restaurant: any) => restaurant._id === id
    );
    setModalContent({
      title: `Empleados en ${restaurant?.name}`,
      content: <Text>Employee management</Text>,
    });
  };

  const handleRestaurantPasswordChange = (id: string) => {
    const restaurant = restaurants?.find(
      (restaurant: any) => restaurant._id === id
    );
    setModalContent({
      title: `Resetear contraseña de ${restaurant?.name}`,
      content: (
        <FormChangePassword onClose={handleModalClose} restaurant={id} />
      ),
    });
  };

  return (
    <View style={styles.wrapper}>
      <CustomModal
        title={modalContent.title}
        isVisible={modalContent.content !== null}
        children={modalContent.content}
        onClose={() => setModalContent({ title: '', content: null })}
        isForm
      />

      <ScrollView contentContainerStyle={styles.container}>
        {restaurants !== null &&
          restaurants.map((restaurant: any) => (
            <View style={styles.restaurantWrapper} key={restaurant._id}>
              <RestaurantDropdownHeader
                restaurantName={restaurant.name}
                city={restaurant.city}
                code={restaurant.code}
                onPress={() => handleRestaurantOpen(restaurant._id)}
                onEditPress={() => handleRestaurantUpdatePress(restaurant._id)}
              />
              {restaurant.isOpened && (
                <View style={styles.optionBox}>
                  <RestaurantOptionButton
                    buttonText="Mostrar cupones canjeados en este restaurante"
                    onPress={() => handleCouponsPress(restaurant._id)}
                  />
                  <RestaurantOptionButton
                    buttonText="Gestionar empleados"
                    onPress={() =>
                      handleEmployeeManagementPress(restaurant._id)
                    }
                  />
                  <RestaurantOptionButton
                    buttonText="Gestionar restaurante"
                    onPress={() => handleRestaurantUpdatePress(restaurant._id)}
                  />
                  <RestaurantOptionButton
                    buttonText="Resetear contraseña"
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
