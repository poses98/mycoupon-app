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

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }
  static async generateBatchCoupons(payload) {
    const url = `${BASE_PATH}/${API_VERSION}/coupon-batch`;
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
      body: JSON.stringify(payload),
    });
    console.log('request', request);

    try {
      const response = await fetch(request);
      return await response.json();
    } catch (error) {
      return error;
    }
  }
  static async validateCoupon(payload) {
    const url = `${BASE_PATH}/${API_VERSION}/validate-coupon`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
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
}

export default CouponApi;
