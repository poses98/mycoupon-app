import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import InputWithLabel from './InputWithLabel';
import { ScrollView } from 'react-native-gesture-handler';

interface CouponFormProps {
  onSubmit: (formData: {
    name: string;
    description: string;
    valid_from: Date;
    valid_until: Date;
    terms: string;
  }) => void;
}

const CreateCouponForm: React.FC<CouponFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [terms, setTerms] = useState('');

  const handleSubmit = () => {
    const formData = {
      name,
      description,
      valid_from: new Date(validFrom),
      valid_until: new Date(validUntil),
      terms,
    };

    onSubmit(formData);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <InputWithLabel label="Name" value={name} onChange={setName} />
      <InputWithLabel
        label="Descripción"
        value={description}
        onChange={setDescription}
      />
      <InputWithLabel
        label="Válido desde (DD-MM-YYYY)"
        value={validFrom}
        onChange={setValidFrom}
      />

      <InputWithLabel
        label="Fecha de validez (DD-MM-YYYY)"
        value={validUntil}
        onChange={setValidUntil}
      />
      <InputWithLabel label="Terms" value={terms} onChange={setTerms} />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreateCouponForm;
