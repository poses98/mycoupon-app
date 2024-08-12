import React, { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const DateTimePickerComponent: React.FC = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default DateTimePickerComponent;
