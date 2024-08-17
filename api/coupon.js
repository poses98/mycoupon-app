import { BASE_PATH, API_VERSION } from '@/api/config';
import * as SecureStore from 'expo-secure-store';
import AuthApi from './AuthApi';

class CouponApi {
  static async getCoupons() {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
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

  static async getCouponById(couponId) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/coupon/${couponId}`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
    });

    try {
      const response = await fetch(request);
      if (response.status !== 200) {
        throw new Error('Error getting coupon');
      }
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  static async generateBatchCoupons(payload) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
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
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken'))) {
      await AuthApi.refreshAccessToken();
    }

    const url = `${BASE_PATH}/${API_VERSION}/validate-coupon`;
    const request = new Request(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await SecureStore.getItemAsync(
          'accessToken'
        )}`,
      }),
      body: JSON.stringify(payload),
    });

    try {
      const response = await fetch(request);
      const responseData = await response.json();

      if (response.status === 200) {
        return { ...responseData, ok: true };
      }

      if (response.status === 400) {
        return { ...responseData.coupon, redeemed: true, ok: true };
      }

      let errorMsg =
        responseData.message || 'Error validando cupón. No entregar productos.';
      if (response.status === 404) {
        errorMsg =
          responseData.message || 'Cupón no encontrado. No entregar productos.';
      } else if (response.status === 403) {
        errorMsg =
          responseData.message || 'Cupón ha caducado. No entregar productos.';
      }

      throw new Error(errorMsg);
    } catch (error) {
      return { error: error.message, ok: false };
    }
  }
  static async setSharedCoupon(payload) {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken'))) {
      await AuthApi.refreshAccessToken();
    }
    const url = `${BASE_PATH}/${API_VERSION}/set-shared-coupon`;
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
      let responseData = await response.json();

      if (response.status === 400) {
        responseData.coupon.redeemed = true;
        responseData = responseData.coupon;
      } else if (response.status === 404) {
        throw new Error('Coupon not found');
      }

      return responseData;
    } catch (error) {
      return null;
    }
  }

  static async getCouponsValidatedBy() {
    if (AuthApi.isTokenExpired(await SecureStore.getItemAsync('accessToken')))
      await AuthApi.refreshAccessToken();
    const url = `${BASE_PATH}/${API_VERSION}/validated-by-coupons`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${await SecureStore.getItemAsync('accessToken')}`,
      }),
    });

    console.log('request', request);

    try {
      const response = await fetch(request);

      if (response.status !== 200) {
        throw new Error('Error getting coupons');
      }

      let responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('error', error);

      return null;
    }
  }
}

export default CouponApi;
