import React, { useState, useEffect, createContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import AuthApi from '@/api/AuthApi';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);
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
            await setSecureItem('accessToken', data.accessToken);
            await setSecureItem('refreshToken', data.refreshToken);
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

  const setSecureItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getUser = () => {
    return user;
  };

  const checkUserLogin = async () => {
    try {
      if (!user) {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (!accessToken) {
          setIsLoading(false);
          return false;
        } else if (AuthApi.isTokenExpired(accessToken)) {
          const refreshToken = await SecureStore.getItemAsync('refreshToken');
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
            setUser(userToken);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
