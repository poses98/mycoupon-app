import { jwtDecode } from 'jwt-decode';
import StorageManager from '@/utils/storageManager';
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

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }

  static async restaurantLogin(credentials) {
    const url = `${BASE_PATH}/${API_VERSION}/restaurant/login`;

    const payload = {
      code: credentials.code,
      password: credentials.password,
    };
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    });
    console.log('Sending request', request);

    try {
      const response = await fetch(request);
      console.log('Response', response);

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
      const refreshToken = await StorageManager.getItemAsync('refreshToken');

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
      await StorageManager.setItemAsync('accessToken', tokens.accessToken);
      await StorageManager.setItemAsync('refreshToken', tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.log(error);
      await StorageManager.deleteItemAsync('accessToken');
      await StorageManager.deleteItemAsync('refreshToken');
      return error;
    }
  }

  static async changePassword(payload) {
    if (
      AuthApi.isTokenExpired(await StorageManager.getItemAsync('accessToken'))
    )
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/user/change-password`;

    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await StorageManager.getItemAsync('accessToken')}`,
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
