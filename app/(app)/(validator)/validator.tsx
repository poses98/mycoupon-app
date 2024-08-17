import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
  Point,
} from 'expo-camera';
import { jwtDecode } from 'jwt-decode';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import CouponApi from '@/api/coupon';
import CouponValidation from '@/components/CouponValidation';
import ICoupon from '@/interfaces/ICoupon';
import { CouponStatus } from '@/enums/CouponStatus';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Validator() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrCodeBounds, setQrCodeBounds] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [busyRead, setBusyRead] = useState(false);
  const [scannedCoupon, setScannedCoupon] = useState<ICoupon | undefined>(
    undefined
  );
  const [isCouponRedeemed, setIsCouponRedeemed] = useState(true);
  const router = useRouter();

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  const handleBarCodeRead = async ({
    data,
    cornerPoints,
  }: BarcodeScanningResult) => {
    if (busyRead && scannedCoupon === undefined) {
      return;
    }
    handleSquare(cornerPoints);
    checkCoupon(data);
  };

  const checkCoupon = async (data: string) => {
    try {
      setBusyRead(true);
      const decodedToken: any = jwtDecode(data);
      if (!decodedToken) {
        throw new Error('Código QR inválido');
      }

      const storedCoupon = await CouponApi.getCouponById(decodedToken.id);
      if (storedCoupon === null) {
        throw new Error('Coupon not found');
      }

      const couponRedeemed = storedCoupon.status === CouponStatus.REDEEMED;
      setIsCouponRedeemed(couponRedeemed);
      if (!couponRedeemed) {
        const couponValidation = await CouponApi.validateCoupon({
          token: data,
        });
        if (!couponValidation.ok) {
          throw new Error(couponValidation.error);
        }
        setScannedCoupon(couponValidation);
      } else {
        setScannedCoupon(storedCoupon);
      }
    } catch (err: any) {
      Alert.alert('Error', err.toString(), [
        {
          text: 'OK',
          onPress: () => {
            setBusyRead(false);
            setScannedCoupon(undefined);
          },
        },
      ]);
    }
  };

  const handleSquare = (cornerPoints: Point[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const minX = Math.min(...cornerPoints.map((point) => point.x));
    const minY = Math.min(...cornerPoints.map((point) => point.y));
    const maxX = Math.max(...cornerPoints.map((point) => point.x));
    const maxY = Math.max(...cornerPoints.map((point) => point.y));

    setQrCodeBounds({
      left: minX,
      top: minY,
      width: maxX - minX,
      height: maxY - minY,
    });
    timeoutRef.current = setTimeout(() => {
      setQrCodeBounds(null);
    }, 500);
  };

  const handleClose = () => {
    router.navigate('/');
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Activa los permisos de la cámara para continuar
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/**TODO add close button that navigate to home screen */}
        {scannedCoupon === undefined && (
          <>
            <View style={styles.close}>
              <AntDesign
                name="close"
                size={30}
                color="white"
                onPress={handleClose}
              />
            </View>
            <ThemedText type="title" style={styles.title}>
              Escanea el cupón
            </ThemedText>
            <View style={styles.cameraContainer}>
              <CameraView
                zoom={0.03}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarCodeRead}
                style={styles.camera}
                facing={'back'}
              />
              {qrCodeBounds && (
                <View
                  style={[
                    styles.qrCodeSquare,
                    {
                      left: qrCodeBounds.left,
                      top: qrCodeBounds.top,
                      width: qrCodeBounds.width,
                      height: qrCodeBounds.height,
                    },
                  ]}
                />
              )}
            </View>
          </>
        )}
      </View>

      {scannedCoupon !== undefined && (
        <CouponValidation
          coupon={scannedCoupon}
          redeemed={isCouponRedeemed}
          handleClose={() => {
            setBusyRead(false);
            setScannedCoupon(undefined);
            setIsCouponRedeemed(false);
          }}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  close: {
    position: 'absolute',
    top: 60,
    right: 40,
  },
  qrCodeSquare: {
    position: 'absolute',
    borderWidth: 4,
    borderColor: Colors.light.buttonYellow,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'ArialRonded',
    color: 'white',
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 30,
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    color: 'white',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
    backgroundColor: Colors.light.tint,
  },
  cameraContainer: {
    borderRadius: 30,
    borderColor: Colors.light.buttonYellow,
    borderWidth: 4,
    overflow: 'hidden',
    zIndex: 3,
  },
  message: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
