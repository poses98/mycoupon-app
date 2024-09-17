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

  static async setPassword(password, restaurantId) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/set-restaurant-password/`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
      body: JSON.stringify({
        newPassword: password,
        confirmNewPassword: password,
        restaurantId,
      }),
    });
    try {
      const response = await fetch(request);
      if (response.status === 403) {
        console.log(response);
        throw new Error(response.message);
      } else if (response.status === 400) {
        console.log(response);
        throw new Error(response.message);
      } else if (response.status !== 200) {
        console.log(response);
        throw new Error(response.message);
      }
      const responseData = await response.json();
      responseData.success = true;
      return responseData;
    } catch (error) {
      return error;
    }
  }

  static async updateRestaurant(restaurantId, formData) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/restaurant/${restaurantId}`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
      body: JSON.stringify(formData),
    });
    try {
      const response = await fetch(request);
      if (response.status === 403) {
        console.log(response);
        throw new Error(response.message);
      } else if (response.status === 400) {
        console.log(response);
        throw new Error(response.message);
      } else if (response.status !== 200) {
        console.log(response);
        throw new Error(response.message);
      }
      const responseData = await response.json();
      responseData.success = true;
      return responseData;
    } catch (error) {
      return error;
    }
  }
}

export default RestaurantApi;
