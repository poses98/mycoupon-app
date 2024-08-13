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
  height: boolean;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      collapsable
      visible={isVisible}
      onRequestClose={onClose}
    >
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '90%',
    width: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingBottom: 20,
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
