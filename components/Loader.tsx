import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '@/constants/Colors';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="small" color={Colors.light.tint} />
    </View>
  );
};

export default Loader;
