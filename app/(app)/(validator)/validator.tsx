import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';

export default function Validator() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrCodeBounds, setQrCodeBounds] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  const handleBarCodeRead = ({ cornerPoints }: BarcodeScanningResult) => {
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
    <View style={styles.container}>
      {/**TODO Go back X icon */}
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
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
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
