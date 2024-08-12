import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';
import InputWithLabel from './InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from './ThemedText';
import QuantitySetter from './QuantitySetter';

interface CouponFormProps {
  onSubmit: (formData: {
    name: string;
    description: string;
    event?: string;
    valid_from: Date;
    valid_until: Date;
    quantity: number;
  }) => void;
}

const CreateCouponForm: React.FC<CouponFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState('');
  const [validFrom, setValidFrom] = useState(new Date());
  const [validUntil, setValidUntil] = useState(new Date());
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    const formData = {
      name,
      description,
      event,
      valid_from: new Date(validFrom),
      valid_until: new Date(validUntil),
      quantity: quantity,
    };

    onSubmit(formData);
  };

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const setValidUntilToEndOfYear = () => {
    const currentYear = new Date().getFullYear();
    setValidUntil(new Date(`${currentYear}-12-31`));
  };

  const setValidFromToday = () => {
    setValidFrom(new Date());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputWithLabel
        label="PRODUCTO"
        value={name}
        onChange={setName}
        placeholder="McMenú Grande y McFlurry"
      />
      <InputWithLabel
        label="DESCRIPCIÓN"
        value={description}
        onChange={setDescription}
        placeholder="Incluye: 1 McMenú Grande y 1 McFlurry"
      />
      <InputWithLabel
        label="EVENTO (OPCIONAL)"
        value={event}
        onChange={setEvent}
        placeholder="Carrera solidaria"
      />
      <InputWithLabel
        label="VÁLIDO DESDE"
        labelComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 'auto',
            }}
          >
            <TouchableOpacity onPress={setValidFromToday}>
              <ThemedText type="link">HOY</ThemedText>
            </TouchableOpacity>
          </View>
        }
        value={validFrom}
        onChange={setValidFrom}
        inputComponent={
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneName="Europe/Madrid"
            value={validFrom}
            mode={'date'}
            minimumDate={new Date()}
            style={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || validFrom;
              setValidFrom(currentDate);
            }}
          />
        }
        defaultValue={new Date().getFullYear() + '-12-31'}
      />

      <InputWithLabel
        label="VÁLIDO HASTA (DD-MM-YYYY)"
        labelComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 'auto',
            }}
          >
            <TouchableOpacity onPress={setValidUntilToEndOfYear}>
              <ThemedText type="link">FIN DE AÑO</ThemedText>
            </TouchableOpacity>
          </View>
        }
        value={validUntil}
        onChange={setValidUntil}
        inputComponent={
          <DateTimePicker
            testID="dateTimePicker"
            value={validUntil}
            mode={'date'}
            timeZoneName="Europe/Madrid"
            minimumDate={new Date()}
            style={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || validUntil;
              setValidUntil(currentDate);
            }}
          />
        }
        defaultValue={new Date().getFullYear() + '-12-31'}
      />

      <QuantitySetter
        initialValue={1}
        onQuantityChange={handleQuantityChange}
      />
      <Button
        title={quantity === 1 ? 'CREAR CUPÓN' : 'CREAR CUPONES'}
        onPress={handleSubmit}
        borderRadius={11}
        marginVertical={10}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
});

export default CreateCouponForm;
