import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type MenuCardProps = {
  icon: string;
  title: string;
  onClick: () => void;
};

const MenuCard: React.FC<MenuCardProps> = ({ icon, title, onClick }) => {
  return (
    <TouchableOpacity style={styles.menuCard} onPress={onClick}>
      <View />
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 10,
    width: '45%',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'light',
    textTransform: 'uppercase',
    color: Colors.light.title,
  },
});

export default MenuCard;
