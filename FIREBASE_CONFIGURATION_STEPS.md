# 🔥 Firebase Configuration Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Add project" or "Create a project"
   - Enter project name (e.g., "ST-Mobile-App")
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Choose whether to enable Google Analytics
   - Click "Continue" or "Create project"
   - Wait for project creation to complete
   - Click "Continue" when ready

### Step 2: Register Your App

1. **Add an App**
   - In Firebase Console, click on your project
   - Click the **Web icon** `</>` (for React Native web compatibility)
   - Or click **iOS/Android** icon for native apps

2. **Register App**
   - **App nickname**: "ST Mobile App" (or any name)
   - **Firebase Hosting**: Leave unchecked (optional)
   - Click "Register app"

3. **Copy Configuration**
   - You'll see a `firebaseConfig` object
   - **IMPORTANT**: Copy this entire configuration
   - Keep this page open or save the config

### Step 3: Get Your Firebase Configuration

Your Firebase config will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### Step 4: Enable Authentication

1. **Go to Authentication**
   - In Firebase Console sidebar, click "Authentication"
   - Click "Get started"

2. **Enable Sign-in Methods**
   - Click "Sign-in method" tab
   - Click "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### Step 5: Enable Firestore Database

1. **Go to Firestore Database**
   - In Firebase Console sidebar, click "Firestore Database"
   - Click "Create database"

2. **Choose Mode**
   - Select "Start in **test mode**" (for development)
   - Or "Start in **production mode**" (more secure)
   - Click "Next"

3. **Choose Location**
   - Select your region (e.g., "us-central", "asia-south1")
   - Click "Enable"
   - Wait for database creation

### Step 6: Update Your Project Configuration

1. **Open `firebase.config.js`**
   - Located at: `c:\Users\akukk\Desktop\ST\firebase.config.js`

2. **Replace Placeholder Values**
   
   **Before:**
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   **After (with your actual values):**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "st-mobile-app.firebaseapp.com",
     projectId: "st-mobile-app",
     storageBucket: "st-mobile-app.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```

### Step 7: Install Firebase Package

1. **Open Terminal**
   - Navigate to your project directory
   ```bash
   cd c:\Users\akukk\Desktop\ST
   ```

2. **Install Firebase**
   ```bash
   npm install firebase
   ```
   
   Or if using yarn:
   ```bash
   yarn add firebase
   ```

3. **Wait for Installation**
   - This will install Firebase SDK
   - Should take 1-2 minutes

### Step 8: Verify Installation

1. **Check package.json**
   - Open `package.json`
   - Verify "firebase" is listed in dependencies:
   ```json
   "dependencies": {
     "firebase": "^10.7.1",
     ...
   }
   ```

2. **Test Import**
   - Firebase config file should have no errors
   - Imports should be recognized

## 🔐 Security Best Practices

### 1. **Firestore Security Rules**

For development (test mode):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

For production (recommended):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. **Environment Variables (Optional)**

For better security, you can use environment variables:

1. **Create `.env` file**:
   ```
   FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789012
   FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
   ```

2. **Update firebase.config.js**:
   ```javascript
   const firebaseConfig = {
     apiKey: process.env.FIREBASE_API_KEY,
     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
     projectId: process.env.FIREBASE_PROJECT_ID,
     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.FIREBASE_APP_ID
   };
   ```

3. **Add `.env` to `.gitignore`**:
   ```
   .env
   ```

## 📱 Complete Configuration File

Your final `firebase.config.js` should look like this:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "st-mobile-app.firebaseapp.com",
  projectId: "st-mobile-app",
  storageBucket: "st-mobile-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Web app registered in Firebase Console
- [ ] Firebase configuration copied
- [ ] `firebase.config.js` updated with actual values
- [ ] Email/Password authentication enabled
- [ ] Firestore database created
- [ ] Firebase package installed (`npm install firebase`)
- [ ] No import errors in firebase.config.js
- [ ] Ready to use Firebase in your app!

## 🚀 Next Steps

After configuration is complete:

1. **Update SignUpScreen.js** - Integrate Firebase Authentication
2. **Update LoginScreen.js** - Add Firebase login
3. **Create Firestore collections** - Store user data
4. **Test authentication** - Sign up and login

## 📞 Common Issues & Solutions

### Issue 1: "Firebase not installed"
**Solution**: Run `npm install firebase` in terminal

### Issue 2: "Cannot find module 'firebase/app'"
**Solution**: 
- Delete `node_modules` folder
- Run `npm install` again
- Restart Metro bundler

### Issue 3: "Firebase configuration error"
**Solution**: 
- Double-check all config values
- Ensure no extra spaces or quotes
- Verify apiKey is correct

### Issue 4: "Authentication not enabled"
**Solution**: 
- Go to Firebase Console
- Authentication > Sign-in method
- Enable Email/Password

### Issue 5: "Firestore permission denied"
**Solution**: 
- Go to Firebase Console
- Firestore Database > Rules
- Update security rules (see above)

## 🔗 Useful Links

- **Firebase Console**: https://console.firebase.google.com/
- **Firebase Documentation**: https://firebase.google.com/docs
- **Firebase Auth Docs**: https://firebase.google.com/docs/auth
- **Firestore Docs**: https://firebase.google.com/docs/firestore

---

**Status**: 📝 Configuration guide ready!
**Next**: Update firebase.config.js with your actual Firebase credentials!
