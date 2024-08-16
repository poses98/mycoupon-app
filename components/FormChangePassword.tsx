import { View } from 'react-native';
import InputWithLabel from './InputWithLabel';
import { useState } from 'react';

interface IFormDataPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const FormChangePassword = () => {
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

  const handleSubmit = () => {
    console.log(formData);
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    } else {
      /**API Call to change password */
    }
  };

  return (
    <View>
      <InputWithLabel
        label="Contraseña anterior"
        secureTextEntry
        onChange={setOldPassword}
      />
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
    </View>
  );
};
