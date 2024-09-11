import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Help() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text>Help</Text>
            {/**TODO FAQ */}
            {/**How do I create coupons? */}
            {/**How do I share coupons? */}
            {/**How can I delete coupons? */}
            {/**How can I see redeemed coupons? */}
            {/**How do I manage restaurant employees? */}
            {/**I want to change my password */}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
});
