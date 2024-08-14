import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';

export default function CustomModal({
  isVisible,
  children,
  onClose,
  title,
  height,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  height?: boolean;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      collapsable
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <View style={[styles.modalContent, height ? { height: 'auto' } : {}]}>
          <View style={styles.titleContainer}>
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
            <Pressable onPress={onClose}>
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
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingBottom: 20,
    // Box shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    // Box shadow for Android
    elevation: 5,
  },
  titleContainer: {
    height: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
