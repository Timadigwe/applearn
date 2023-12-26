import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import BookDetailScreen from '../screens/home/BookDetailScreen';
import PdfViewer from '../screens/pdfViewer/PdfViewer';
import OfflineScreen from '../screens/home/OfflineScreen';
import SearchScreen from '../screens/home/SearchScreen';
import CustomDrawerContent from '../screens/home/CustomDrawerContent';
import TextContentScreen from '../screens/home/TextContentScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack navigator for screens inside HomeNavigator
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false, // Set headerShown to false
        }}
      />
      <Stack.Screen
        name="BookDetailScreen"
        component={BookDetailScreen}
        options={{
          headerShown: false, // Set headerShown to false
        }}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{
          headerShown: false, // Set headerShown to false
        }}
      />
      <Stack.Screen
        name="TextContentScreen"
        component={TextContentScreen}
        options={{
          headerShown: false, // Set headerShown to false
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

// Drawer navigator containing the HomeStack
const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false, // Set headerShown to false
        }}
      />
      <Drawer.Screen
        name="Offline Mode"
        component={OfflineScreen}
      />
      {/* Add more screens inside the Drawer.Navigator if needed */}
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
