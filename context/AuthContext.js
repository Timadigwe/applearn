import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize state with the value from AsyncStorage or default to false
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to persist isLoggedIn state
  const persistLoginState = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
    } catch (error) {
      console.error('Error persisting login state:', error);
    }
  };

  // Function to retrieve isLoggedIn state from AsyncStorage
  const getLoginStateFromStorage = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('isLoggedIn');
      if (storedValue !== null) {
        const storedIsLoggedIn = JSON.parse(storedValue);
        setLoggedIn(storedIsLoggedIn); // Update the state with the retrieved value
      }
    } catch (error) {
      console.error('Error retrieving login state from storage:', error);
    }
  };

  // Call getLoginStateFromStorage when the component mounts
  useEffect(() => {
    getLoginStateFromStorage();
  }, []);

  // Call persistLoginState whenever the isLoggedIn state changes
  useEffect(() => {
    persistLoginState();
  }, [isLoggedIn]);

  // Your existing login and logout functions
  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
