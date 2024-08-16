import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';
import InputWithLabel from './InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from './ThemedText';
import QuantitySetter from './QuantitySetter';
import { Colors } from '@/constants/Colors';

const suggestedProducts = [
  'McMenú® Grande',
  'Cubo 25 McNuggets®',
  'McFlurry®',
  'McMuffin® Salchicha y Huevo',
  'McMuffin® Bacon y Huevo',
  'Happy Meal®',
];

interface CouponFormProps {
  onSubmit: (formData: {
    name: string;
    description: string;
    event?: string;
    valid_from: Date;
    valid_until: Date;
    quantity: number;
  }) => void;
  isSubmittingForm: boolean;
}

const CreateCouponForm: React.FC<CouponFormProps> = ({
  onSubmit,
  isSubmittingForm,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState('');
  const [validFrom, setValidFrom] = useState(new Date());
  const [validUntil, setValidUntil] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [submitSent, setSubmitSent] = useState(false);

  const handleSubmit = () => {
    setSubmitSent(true);
    const formData = {
      name,
      description,
      event,
      valid_from: new Date(validFrom),
      valid_until: new Date(validUntil),
      quantity: quantity,
    };

    onSubmit(formData);
    setTimeout(() => {
      setSubmitSent(false);
    }, 1000);
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

  const renderSuggestedProduct = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={styles.suggestedProducts}
        onPress={() => setName(item)}
      >
        <ThemedText type="link">{item}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputWithLabel
        label="PRODUCTO"
        value={name}
        onChange={setName}
        placeholder="McMenú Grande y McFlurry"
        labelComponent={
          <FlatList
            horizontal
            data={suggestedProducts}
            renderItem={renderSuggestedProduct}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
          />
        }
        labelFlexDirection="column"
      />
      <InputWithLabel
        label="DESCRIPCIÓN"
        value={description}
        onChange={setDescription}
        placeholder={`Incluye: 1 ${name}`}
        labelComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 'auto',
            }}
          >
            <TouchableOpacity
              onPress={() => setDescription(`Incluye: 1 ${name}`)}
            >
              <ThemedText type="link">Aceptar sugerencia</ThemedText>
            </TouchableOpacity>
          </View>
        }
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
});

export default CreateCouponForm;
