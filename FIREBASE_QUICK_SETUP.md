# 🔥 Firebase Quick Setup - 5 Minutes

## 🎯 Quick Steps

### 1️⃣ Create Firebase Project (2 min)
```
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name: "ST-Mobile-App"
4. Click "Continue" → "Create project"
```

### 2️⃣ Register Web App (1 min)
```
1. Click Web icon (</>)
2. App nickname: "ST Mobile App"
3. Click "Register app"
4. COPY the firebaseConfig object
```

### 3️⃣ Enable Services (1 min)
```
Authentication:
1. Sidebar → Authentication → Get started
2. Sign-in method → Email/Password → Enable → Save

Firestore:
1. Sidebar → Firestore Database → Create database
2. Start in test mode → Next
3. Choose location → Enable
```

### 4️⃣ Update Config File (1 min)
```
1. Open: firebase.config.js
2. Replace YOUR_API_KEY with actual values
3. Paste your copied firebaseConfig
```

### 5️⃣ Install Firebase
```bash
npm install firebase
```

## 📋 Your Firebase Config

Copy this from Firebase Console and paste into `firebase.config.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // ← Copy from Firebase
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

## ✅ Done!

Your `firebase.config.js` should now look like:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // Your actual key
  authDomain: "st-mobile-app.firebaseapp.com",
  projectId: "st-mobile-app",
  storageBucket: "st-mobile-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

## 🚀 Ready to Code!

Firebase is now configured and ready to use in your Sign Up page!

---

**Need help?** See `FIREBASE_CONFIGURATION_STEPS.md` for detailed guide.
