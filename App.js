import { Text, View, ActivityIndicator } from 'react-native';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color="blue"
        />
      </View>
    );
  }

  // Use SplashScreen to prevent auto hiding
  SplashScreen.preventAutoHideAsync().catch((e) => {
    console.warn(e); // Handle error, if any
  });

  // Hide the splash screen once your app component has rendered
  SplashScreen.hideAsync().catch((e) => {
    console.warn(e); // Handle error, if any
  });

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
