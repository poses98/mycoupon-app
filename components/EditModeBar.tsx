import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EditModeBar({
  closeEditMode,
  isEditMode,
}: {
  closeEditMode: () => void;
  isEditMode: boolean;
}) {
  return (
    <View style={[styles.container, { display: isEditMode ? 'flex' : 'none' }]}>
      <TouchableOpacity onPress={closeEditMode}>
        <AntDesign name="close" size={30} color={'white'} />
      </TouchableOpacity>
      {/**TODO Number items selected */}
      <Text style={styles.numberText}>(10)</Text>
      {/**TODO Share button */}
      {/* TODO Delete button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.selected,
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    color: 'white',
  },
  numberText: {
    color: 'white',
    fontSize: 16,
  },
});
