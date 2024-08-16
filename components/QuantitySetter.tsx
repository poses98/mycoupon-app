import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

interface QuantitySetterProps {
  initialValue: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySetter: React.FC<QuantitySetterProps> = ({
  initialValue,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [editingQuantity, setEditingQuantity] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(quantity.toString());

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
    setInputQuantity(newQuantity.toString());
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setInputQuantity(newQuantity.toString());
    }
  };

  const handleInputQuantityChange = (text: string) => {
    setInputQuantity(text);
  };

  const handleInputQuantityBlur = () => {
    const newQuantity = parseInt(inputQuantity);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setInputQuantity(newQuantity.toString());
    }
    setEditingQuantity(false);
  };

  const handleInputQuantityFocus = () => {
    setEditingQuantity(true);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
      }}
    >
      <ThemedText type="form-label">CANTIDAD</ThemedText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
          marginLeft: '25%',
          marginVertical: 10,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <AntDesign name="minus" size={24} color="black" />
        </TouchableOpacity>
        {editingQuantity ? (
          <TextInput
            style={styles.quantityText}
            value={inputQuantity}
            onChangeText={handleInputQuantityChange}
            onBlur={handleInputQuantityBlur}
            autoFocus
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.quantityText} onPress={handleInputQuantityFocus}>
            {quantity}
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.light.tint,
    borderRadius: 50,
    borderCurve: 'circular',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantityText: {
    fontSize: 20,
    color: Colors.light.tint,
    fontFamily: 'ArialRonded',
  },
});

export default QuantitySetter;
