import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBX95pyOGiLyz8JhrZmjD_poyjnT-aY_Nk",
  authDomain: "safe-tour-6747f.firebaseapp.com",
  projectId: "safe-tour-6747f",
  storageBucket: "safe-tour-6747f.appspot.com",
  messagingSenderId: "375757006604",
  appId: "1:375757006604:web:ddcf953ebf3d6736788b29",
  measurementId: "G-BVBLETWEGC"
};

// Initialize Firebase (Singleton pattern)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth with persistence for React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If auth already initialized, get the existing instance
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

export { auth, app, firebaseConfig };