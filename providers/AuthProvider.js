import React, { useState, useEffect, createContext } from 'react';
import StorageManager from '@/utils/storageManager';
import { jwtDecode } from 'jwt-decode';
import AuthApi from '@/api/AuthApi';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const signIn = async (email, password) => {
    if (!email || !password) {
      return false;
    } else {
      try {
        const data = await AuthApi.login({ email, password });
        if (!data) {
          return false;
        } else {
          try {
            await StorageManager.setItemAsync('accessToken', data.accessToken);
            await StorageManager.setItemAsync(
              'refreshToken',
              data.refreshToken
            );
            const userToken = jwtDecode(data.accessToken);
            setUser(userToken);
            return true;
          } catch (err) {
            return false;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const restaurantSignIn = async (code, password) => {
    console.log('Restaurant sign in');

    if (!code || !password) {
      return false;
    } else {
      try {
        const data = await AuthApi.restaurantLogin({ code, password });
        console.log(data);

        if (!data) {
          return false;
        } else {
          try {
            await StorageManager.setItemAsync('accessToken', data.accessToken);
            await StorageManager.setItemAsync(
              'refreshToken',
              data.refreshToken
            );
            const restaurantToken = jwtDecode(data.accessToken);

            setRestaurant(restaurantToken);
            return true;
          } catch (err) {
            return false;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getUser = () => {
    return user;
  };

  const checkUserLogin = async () => {
    try {
      if (!user) {
        const accessToken = await StorageManager.getItemAsync('accessToken');
        if (!accessToken) {
          setIsLoading(false);
          return false;
        } else if (AuthApi.isTokenExpired(accessToken)) {
          const refreshToken = await StorageManager.getItemAsync(
            'refreshToken'
          );
          if (!AuthApi.isTokenExpired(refreshToken)) {
            await AuthApi.refreshAccessToken();
            checkUserLogin();
          } else {
            signOut();
            setIsLoading(false);
            return false;
          }
        } else {
          try {
            const userToken = jwtDecode(accessToken);
            if (userToken.role === 'restaurant') {
              setRestaurant(userToken);
            } else {
              setUser(userToken);
            }
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
      signOut();
    }
  };

  const signOut = async () => {
    await StorageManager.deleteItemAsync('accessToken');
    await StorageManager.deleteItemAsync('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, restaurant, signIn, isLoading, signOut, restaurantSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
