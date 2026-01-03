import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqBvsMb7rm0QbEOdbMRNnlJNcXIxKdaXo",
  authDomain: "st-mobile-app-6404e.firebaseapp.com",
  projectId: "st-mobile-app-6404e",
  storageBucket: "st-mobile-app-6404e.appspot.com",
  messagingSenderId: "199149347159",
  appId: "1:199149347159:web:e58b497ff67454c801de12",
  measurementId: "G-HGH54N75N6"
};

// Initialize Firebase App
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Get Auth instance (no persistence for now to avoid the error)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
export default app;