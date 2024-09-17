import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '@/components/Button';
import InputWithLabel from './InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import IRestaurant from '@/interfaces/IRestaurant';
import { ThemedText } from './ThemedText';
import RestaurantApi from '@/api/restaurants';

interface RestaurantFormProps {
  isSubmittingForm: boolean;
  restaurant: IRestaurant;
  onSubmit: () => void;
}

const UpdateRestaurant: React.FC<RestaurantFormProps> = ({
  isSubmittingForm,
  restaurant,
  onSubmit,
}) => {
  const [alias, setAlias] = useState(restaurant.name || '');
  const [hasBreakfast, setHasBreakfast] = useState(
    restaurant.has_breakfast || false
  );
  const [city, setCity] = useState(restaurant.city || '');
  const [province, setProvince] = useState(restaurant.province || '');
  const [submitSent, setSubmitSent] = useState(false);

  const handleSubmit = async () => {
    setSubmitSent(true);
    const formData = {
      name: alias !== restaurant.name ? alias : undefined,
      has_breakfast:
        hasBreakfast !== restaurant.has_breakfast ? hasBreakfast : undefined,
      city: city !== restaurant.city ? city : undefined,
      province: province !== restaurant.province ? province : undefined,
    };

    // Call to the API to update the restaurant
    const updatedRestaurant: any = await RestaurantApi.updateRestaurant(
      restaurant._id,
      formData
    );

    if (!updatedRestaurant.success) {
      Alert.alert('Error', 'Ha ocurrido un error al actualizar el restaurante');
    } else {
      Alert.alert('Éxito', 'Restaurante actualizado correctamente');
      onSubmit();
    }
    setTimeout(() => {
      setSubmitSent(false);
    }, 1000);
  };
  const handleHasBreakfastChange = () => {
    setHasBreakfast((prevState) => !prevState);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputWithLabel
        label="Nombre"
        value={alias}
        onChange={setAlias}
        placeholder="Nombre restaurante"
      />
      <InputWithLabel
        label="Ciudad"
        value={city}
        onChange={setCity}
        placeholder="Descripción del restaurante"
      />

      <InputWithLabel
        label="Provincia"
        value={province}
        onChange={setProvince}
        placeholder="Provincia"
      />

      <InputWithLabel
        label="Desayunos"
        inputComponent={
          <TouchableOpacity
            style={styles.checkboxWrapper}
            onPress={handleHasBreakfastChange}
          >
            <Checkbox
              style={styles.checkbox}
              value={hasBreakfast}
              onValueChange={setHasBreakfast}
              color={hasBreakfast ? Colors.light.tint : undefined}
            />
            <ThemedText type="default">Tiene desayunos</ThemedText>
          </TouchableOpacity>
        }
      />

      <Button
        title={'Actualizar Restaurante'}
        onPress={handleSubmit}
        borderRadius={11}
        marginVertical={10}
        disabled={isSubmittingForm || submitSent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  suggestedProducts: {
    borderColor: Colors.light.tint,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkbox: {
    margin: 8,
    marginLeft: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default UpdateRestaurant;
