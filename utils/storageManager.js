import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

class StorageManager {
  static async setItemAsync(key, value) {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error storing data', error);
    }
  }

  static async getItemAsync(key) {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error getting data', error);
    }
  }

  static async deleteItemAsync(key) {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error deleting data', error);
    }
  }
}

export default StorageManager;
