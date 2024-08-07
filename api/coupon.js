import { BASE_PATH, API_VERSION } from '@/api/config';
import * as SecureStore from 'expo-secure-store';

class CouponApi {
  static async getCoupons() {
    const url = `${BASE_PATH}/${API_VERSION}/coupons`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
    });
    console.log(request);

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }
}

export default CouponApi;
