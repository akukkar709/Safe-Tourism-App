import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCqBvsMb7rm0QbEOdbMRNnlJNcXIxKdaXo",
  authDomain: "st-mobile-app-6404e.firebaseapp.com",
  projectId: "st-mobile-app-6404e",
  storageBucket: "st-mobile-app-6404e.firebasestorage.app",
  messagingSenderId: "199149347159",
  appId: "1:199149347159:web:e58b497ff67454c801de12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;



// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // For web apps, we don't need AsyncStorage
// let auth;
// const isWeb = typeof window !== 'undefined';

// // Only import AsyncStorage in non-web environments
// if (!isWeb) {
//   import('@react-native-async-storage/async-storage').then(AsyncStorage => {
//     auth = initializeAuth(app, {
//       persistence: getReactNativePersistence(AsyncStorage.default)
//     });
//   });
// } else {
//   // For web, use browser's built-in persistence
//   auth = initializeAuth(app);
// }

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqBvsMb7rm0QbEOdbMRNnlJNcXIxKdaXo",
//   authDomain: "st-mobile-app-6404e.firebaseapp.com",
//   projectId: "st-mobile-app-6404e",
//   storageBucket: "st-mobile-app-6404e.firebasestorage.app",
//   messagingSenderId: "199149347159",
//   appId: "1:199149347159:web:e58b497ff67454c801de12",
//   measurementId: "G-HGH54N75N6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Export initialized auth and db
// export { auth, db };
// export default app;