import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';

const CustomDrawerContent = (props) => {
  const { logout } = useAuth(); // Replace with your actual logout function

  return (
    <DrawerContentScrollView {...props}>
      {/* Display the default drawer items */}
      <DrawerItemList {...props} />

      {/* Add a custom logout button at the bottom */}
      <TouchableOpacity
        style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#ccc' }}
        onPress={() => {
          // Call your logout function here
          logout();
        }}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
