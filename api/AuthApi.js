import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import { BASE_PATH, API_VERSION } from '@/api/config';

class AuthApi {
  static async login(credentials) {
    const url = `${BASE_PATH}/${API_VERSION}/user/sign-in`;
    const payload = {
      email: credentials.email,
      password: credentials.password,
    };

    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    });
    console.log('Login user');

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }

  static isTokenExpired(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { expires } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > expires;
  }

  static async refreshAccessToken() {
    const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;

    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      const payload = {
        REFRESH_TOKEN: refreshToken,
      };
      const request = new Request(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      });

      const response = await fetch(request);
      const tokens = await response.json();
      if (response.status !== 200) {
        throw tokens;
      }
      await SecureStore.setItemAsync('accessToken', tokens.accessToken);
      await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      return error;
    }
  }

  static async changePassword(payload) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/user/change-password`;

    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
      body: JSON.stringify(payload),
    });

    try {
      const response = await fetch(request);
      if (response.status === 403) {
        throw error;
      } else if (response.status === 400) {
        throw error;
      } else if (response.status !== 200) {
        throw error;
      }
      const responseData = await response.json();
      responseData.success = true;
      return responseData;
    } catch (error) {
      return error;
    }
  }
}

export default AuthApi;
