import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface IRestaurantOptionsProps {
  buttonText: string;
  onPress: () => void;
}

export default function RestaurantOptionButton({
  buttonText,
  onPress,
}: IRestaurantOptionsProps) {
  const handleOnPress = () => {
    onPress();
  };

  return (
    <TouchableOpacity style={styles.menuOption} onPress={handleOnPress}>
      <Text>{buttonText || 'Must provide a valid buttonText value'}</Text>
      <AntDesign name="right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 15,
    paddingVertical: 10,
  },
});
