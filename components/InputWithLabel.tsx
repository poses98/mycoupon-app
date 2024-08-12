import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';

export default function InputWithLabel({
  label,
  icon,
  secureTextEntry,
  onChange,
  value,
  ...rest
}: {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  onChange: any;
  value: string;
}) {
  return (
    <View style={styles.container}>
      <ThemedText type="form-label">{label}</ThemedText>
      <View style={styles.inputField}>
        <AntDesign name={icon} size={20} color="#848484" />

        <TextInput
          style={{
            borderRadius: 5,
            fontSize: 16,
            paddingLeft: icon ? 10 : 0,
            width: '100%',
          }}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          clearButtonMode="while-editing"
          onChangeText={onChange}
          value={value}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingRight: 25,
    width: '100%',
    borderRadius: 10,
    backgroundColor: Colors.light.inputTextBackground,
  },
  container: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 15,
  },
});
