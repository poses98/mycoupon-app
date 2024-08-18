import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

export default function CustomModal({
  isVisible,
  children,
  onClose,
  title,
  height,
  isForm,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  height?: boolean;
  isForm?: boolean;
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      collapsable
      visible={isVisible}
      onRequestClose={handleClose}
      onDismiss={onClose}
    >
      <Pressable
        style={styles.modalBackground}
        onPress={() => {
          if (!isForm) {
            handleClose();
          }
        }}
      >
        <View style={[styles.modalContent, height ? { height: 'auto' } : {}]}>
          <View style={styles.titleContainer}>
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    height: '90%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  titleContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.light.tint,
    fontSize: 22,
  },
});
