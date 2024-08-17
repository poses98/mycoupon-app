import React, { useEffect, useMemo, useRef } from 'react';
import ICoupon from '@/interfaces/ICoupon';
import { getFormattedDate } from '@/utils/dateUtils';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-qr-code';
import { Image } from 'expo-image';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export const ShareableCard = ({ coupon }: { coupon: ICoupon }) => {
  const cardRef = useRef<View>(null);
  const memoizedQRCode = useMemo(() => {
    return (
      <QRCode
        value={coupon._id}
        size={180}
        fgColor={Colors.light.buttonYellow}
        bgColor={Colors.light.tint}
      />
    );
  }, [coupon._id]);
  const valid_from = new Date(coupon.valid_from);
  const valid_until = new Date(coupon.valid_until);

  const handleCapture = async () => {
    try {
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1,
      });
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
        });
      } else {
        Alert.alert('Error', 'La opción de compartir no está disponible');
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      Alert.alert('Error', 'Error al compartir. Inténtalo de nuevo');
    }
  };

  useEffect(() => {
    console.log(coupon);

    const interval = setInterval(() => {
      if (cardRef.current) {
        cardRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (width > 0 && height > 0) {
            clearInterval(interval);
            handleCapture();
          }
        });
      } else {
        console.log('No cardRef');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cardRef]);

  const formattedLocations = useMemo(() => {
    const locations = coupon.is_valid_at.map(
      (location: any) => `${location.name} (${location.province})`
    );

    if (locations.length > 1) {
      return `${locations.slice(0, -1).join(', ')} y ${
        locations[locations.length - 1]
      }`;
    }

    return locations[0];
  }, [coupon.is_valid_at]);

  return (
    <>
      <View style={styles.foreground} />
      <View ref={cardRef} style={styles.container}>
        <Image
          source={require('@/assets/images/mcd_logo.svg')}
          style={styles.imageContainer}
          contentFit="contain"
        />
        <ThemedText type="title" style={styles.title}>
          Disfruta de la experiencia McDonald's®
        </ThemedText>
        <View style={styles.yellowLine} />
        <View style={styles.subtitleContainer}>
          <ThemedText type="default" style={styles.subtitle}>
            Queremos regalarte un/a
          </ThemedText>
          <ThemedText type="default" style={[styles.subtitle, styles.product]}>
            {coupon.title}
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            para disfrutarlo con quien tu elijas.
          </ThemedText>
        </View>
        <View style={styles.qrcontainer}>{memoizedQRCode}</View>
        <ThemedText type="defaultSemiBold" style={styles.description}>
          {coupon.description}
        </ThemedText>
        {coupon.event !== 'GENERAL' && (
          <Text style={styles.terms}>
            Este cupón forma parte de{' '}
            <Text
              style={[
                styles.terms,
                { fontWeight: 'bold', textTransform: 'uppercase' },
              ]}
            >
              {coupon.event}.
            </Text>
          </Text>
        )}

        <Text style={styles.terms}>
          Cupón canjeable en tus restaurantes McDonald's® de{' '}
          {formattedLocations} desde el {getFormattedDate(valid_from)} hasta el{' '}
          {getFormattedDate(valid_until)}. No acumulable a otras ofertas y/o
          promoción. No válido para pedidos de McDelivery™ ni quioscos de venta.
          Consultar con el encargado.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  foreground: {
    position: 'absolute',
    width: '100%',
    height: 700,
    backgroundColor: 'rgba(255,255,255, 1)',
    zIndex: -1,
  },
  container: {
    width: '100%',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
    position: 'absolute',
    zIndex: -1,
  },
  yellowLine: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.light.buttonYellow,
    marginVertical: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    fontSize: 30,
  },
  qrcontainer: {
    marginVertical: 15,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'normal',
    color: 'white',
  },
  subtitleContainer: {
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'normal',
    color: 'white',
    width: '90%',
  },
  terms: {
    fontSize: 12,
    color: 'white',
    textAlign: 'justify',
    marginTop: 20,
  },
  product: {
    fontWeight: 'bold',
    fontSize: 26,
    marginVertical: 10,
    lineHeight: 30,
  },
});
