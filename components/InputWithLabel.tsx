import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import React from 'react';

interface InputWithLabelProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  onChange?: any;
  value?: string;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  labelComponent?: React.ReactElement;
  defaultValue?: string;
  placeholder?: string;
  inputComponent?: React.ReactElement;
  labelFlexDirection?: 'row' | 'column';
}

export default function InputWithLabel({
  label,
  icon,
  secureTextEntry,
  onChange,
  value,
  autocapitalize,
  labelComponent,
  defaultValue,
  placeholder,
  inputComponent,
  labelFlexDirection,
  ...rest
}: InputWithLabelProps) {
  return (
    <View style={styles.container}>
      {label && !labelComponent && (
        <ThemedText type="form-label">{label}</ThemedText>
      )}
      {label && labelComponent && (
        <View
          style={[
            styles.labelContainer,
            { flexDirection: labelFlexDirection || 'row' },
          ]}
        >
          <ThemedText type="form-label">{label}</ThemedText>
          {labelComponent}
        </View>
      )}
      {!label && labelComponent && labelComponent}

      <View style={!inputComponent ? styles.inputField : styles.inputContainer}>
        <AntDesign name={icon} size={20} color="#848484" />
        {inputComponent && inputComponent}
        {!inputComponent && (
          <TextInput
            style={{
              borderRadius: 5,
              fontSize: 16,
              paddingLeft: icon ? 10 : 0,
              width: '100%',
            }}
            secureTextEntry={secureTextEntry}
            clearButtonMode="while-editing"
            onChangeText={onChange}
            defaultValue={defaultValue ? defaultValue : ''}
            placeholder={placeholder}
            value={value}
            {...rest}
          />
        )}
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
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  container: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 15,
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignContent: 'center',
  },
});
