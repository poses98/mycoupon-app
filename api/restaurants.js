import { BASE_PATH, API_VERSION } from '@/api/config';
import * as SecureStore from 'expo-secure-store';
import AuthApi from './AuthApi';

class RestaurantApi {
  static async getRestaurants() {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/user/restaurants`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
    });

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }
}

export default RestaurantApi;
