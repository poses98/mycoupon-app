import ICoupon from '@/interfaces/ICoupon';
import { View, StyleSheet } from 'react-native';
import { CouponStatus } from '@/enums/CouponStatus';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Button from './Button';

export default function CouponValidation({
  coupon,
  handleClose,
  redeemed,
}: {
  coupon: ICoupon;
  handleClose: () => void;
  redeemed: boolean;
}) {
  const statusText = redeemed ? 'CUPÓN YA CANJEADO' : 'VALIDADO CON ÉXITO';
  const redeemedDate = new Date(coupon.redeemed_date);
  const redeemedDateStr = redeemedDate
    ? `${redeemedDate?.getDate()}/${redeemedDate?.getMonth() < 9 ? '0' : ''}${
        redeemedDate?.getMonth() + 1
      }/${redeemedDate?.getFullYear()}`
    : '';
  const redeemedHourStr = redeemedDate
    ? `${redeemedDate?.getHours()}:${
        redeemedDate.getMinutes() < 10 ? '0' : ''
      }${redeemedDate.getMinutes()}`
    : '';

  const acceptedImage = require('../assets/images/accepted.png');
  const rejectedImage = require('../assets/images/denied.png');
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: redeemed
            ? Colors.light.redeemedBg
            : Colors.light.validBg,
        },
      ]}
    >
      <View style={styles.close}>
        <AntDesign name="close" size={24} color="white" onPress={handleClose} />
      </View>
      <Image
        source={redeemed ? rejectedImage : acceptedImage}
        style={styles.image}
        contentFit="contain"
      />
      <ThemedText type="title" style={styles.title}>
        {statusText}
      </ThemedText>
      {redeemed && redeemedDate && (
        <View style={styles.infoContainer}>
          <ThemedText type="default" style={styles.sectionHeader}>
            CANJEADO EL DÍA
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {redeemedDateStr}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            A LAS
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {redeemedHourStr}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            RESTAURANTE
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.redeemed_at.code}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            ENCARGADO
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.validated_by.name}
          </ThemedText>
        </View>
      )}
      {!redeemed && (
        <View style={styles.infoContainer}>
          <ThemedText type="default" style={styles.sectionHeader}>
            PRODUCTO
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.title}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            DESCRIPCIÓN
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.description}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            CANJEADO EL DÍA
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {redeemedDateStr}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            A LAS
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {redeemedHourStr}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            RESTAURANTE
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.redeemed_at.code}
          </ThemedText>
          <ThemedText type="default" style={styles.sectionHeader}>
            ENCARGADO
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionInfo}>
            {coupon.validated_by.name}
          </ThemedText>
        </View>
      )}
      <Button title="VOLVER A ESCANEAR" onPress={handleClose} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    padding: 20,
  },
  close: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  image: {
    width: 100,
    height: 100,
    zIndex: 5,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'ArialRounded',
    color: 'white',
    fontSize: 40,
    lineHeight: 45,
    marginBottom: 10,
  },
  sectionHeader: {
    color: 'white',
    fontWeight: 'light',
    fontSize: 16,
  },
  sectionInfo: {
    color: 'white',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 40,
  },
});
