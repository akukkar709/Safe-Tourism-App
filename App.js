import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Import Firebase
import { auth, db } from './firebase.config';

// Import screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AadharVerificationScreen from './screens/AadharVerificationScreen';
import FaceVerificationScreen from './screens/FaceVerificationScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import EmergencyServicesScreen from './screens/EmergencyServicesScreen';

const Stack = createStackNavigator();

// Ignore specific warnings
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted',
]);

const App = () => {
  useEffect(() => {
    // Initialize auth state observer
    const unsubscribe = auth?.onAuthStateChanged ? auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user.uid);
      } else {
        // User is signed out
        console.log('User is signed out');
      }
    }) : () => {}; // Return empty function if auth is not initialized yet

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6366f1',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerTitleAlign: 'center',
            cardStyle: { backgroundColor: '#fff' },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ 
              title: 'Log In',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ 
              title: 'Create Account',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="AadharVerification" 
            component={AadharVerificationScreen}
            options={{ 
              title: 'Verify Aadhar',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="FaceVerification" 
            component={FaceVerificationScreen}
            options={{ 
              title: 'Face Verification',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="UserProfile" 
            component={UserProfileScreen}
            options={{ 
              title: 'My Profile',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ 
              title: 'Settings',
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="EmergencyServices" 
            component={EmergencyServicesScreen}
            options={{ 
              title: 'Emergency Services',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;