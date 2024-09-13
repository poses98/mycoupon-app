import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '@/components/Button';
import InputWithLabel from './InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import IRestaurant from '@/interfaces/IRestaurant';
import { ThemedText } from './ThemedText';

interface RestaurantFormProps {
  onSubmit: () => void;
  isSubmittingForm: boolean;
  restaurant: IRestaurant;
}

const UpdateRestaurant: React.FC<RestaurantFormProps> = ({
  onSubmit,
  isSubmittingForm,
  restaurant,
}) => {
  const [alias, setAlias] = useState(restaurant.name || '');
  const [description, setDescription] = useState(restaurant.description || '');
  const [hasBreakfast, setHasBreakfast] = useState(
    restaurant.has_breakfast || false
  );
  const [address, setAddress] = useState(restaurant.address || '');
  const [city, setCity] = useState(restaurant.city || '');
  const [orovince, setProvince] = useState(restaurant.province || '');
  const [submitSent, setSubmitSent] = useState(false);

  const handleSubmit = () => {
    setSubmitSent(true);
    const formData = {};

    onSubmit();
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
        value={orovince}
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
