// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth} from 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBX95pyOGiLyz8JhrZmjD_poyjnT-aY_Nk",
//   authDomain: "safe-tour-6747f.firebaseapp.com",
//   projectId: "safe-tour-6747f",
//   storageBucket: "safe-tour-6747f.firebasestorage.app",
//   messagingSenderId: "375757006604",
//   appId: "1:375757006604:web:ddcf953ebf3d6736788b29",
//   measurementId: "G-BVBLETWEGC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);




// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBX95pyOGiLyz8JhrZmjD_poyjnT-aY_Nk",
  authDomain: "safe-tour-6747f.firebaseapp.com",
  projectId: "safe-tour-6747f",
  storageBucket: "safe-tour-6747f.firebasestorage.app",
  messagingSenderId: "375757006604",
  appId: "1:375757006604:web:ddcf953ebf3d6736788b29",
  measurementId: "G-BVBLETWEGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

