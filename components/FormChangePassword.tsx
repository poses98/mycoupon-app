import { View, StyleSheet, Alert } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';
import Button from './Button';
import AuthApi from '@/api/AuthApi';

interface IFormDataPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface FormChangePasswordProps {
  restaurant?: string;
  onClose: () => void;
}

const FormChangePassword = ({
  onClose,
  restaurant,
}: FormChangePasswordProps) => {
  const [formData, setFormData] = useState<IFormDataPassword>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const setOldPassword = (oldPassword: string) => {
    setFormData({ ...formData, oldPassword });
  };

  const setNewPassword = (newPassword: string) => {
    setFormData({ ...formData, newPassword });
  };
  const setConfirmNewPassword = (confirmNewPassword: string) => {
    setFormData({ ...formData, confirmNewPassword });
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    } else {
      try {
        const response = restaurant
          ? null
          : await AuthApi.changePassword(formData);
        if (!response?.success) {
          throw new Error(response.message);
        } else {
          Alert.alert('Éxito', 'Contraseña cambiada correctamente', [
            { text: 'OK', onPress: onClose },
          ]);
        }
      } catch (e: unknown) {
        Alert.alert('Error', 'No se ha podido cambiar la contraseña');
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      {!restaurant && (
        <InputWithLabel
          label="Contraseña anterior"
          secureTextEntry
          onChange={setOldPassword}
        />
      )}

      <InputWithLabel
        label="Nueva contraseña"
        secureTextEntry
        onChange={setNewPassword}
      />
      <InputWithLabel
        label="Repite la contraseña"
        secureTextEntry
        onChange={setConfirmNewPassword}
      />
      <Button title="Cambiar contraseña" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 20,
  },
});

export default FormChangePassword;
