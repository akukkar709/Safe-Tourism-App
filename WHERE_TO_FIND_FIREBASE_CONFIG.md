# 🔍 Where to Find Firebase Configuration Values

## 📍 Step-by-Step Location Guide

### Method 1: During App Registration (Easiest)

When you register your app, Firebase shows the config immediately:

```
Firebase Console → Your Project → Add App (Web Icon) → Register App
↓
You'll see this screen with your config:
```

**The config appears right after clicking "Register app":**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**📋 Copy this entire object!**

---

### Method 2: Find Config After Registration

If you already registered your app and closed the window:

#### Step 1: Go to Project Settings

```
1. Open Firebase Console: https://console.firebase.google.com/
2. Click on your project
3. Click the ⚙️ (gear icon) next to "Project Overview"
4. Click "Project settings"
```

#### Step 2: Scroll Down to "Your apps"

```
1. In Project Settings page
2. Scroll down to "Your apps" section
3. You'll see your registered app(s)
```

#### Step 3: View Config

```
1. Find your web app (shows </> icon)
2. Look for "SDK setup and configuration"
3. Select "Config" radio button (not npm)
4. You'll see the firebaseConfig object
5. Copy the entire config
```

---

## 🎯 Visual Guide - Where Each Value Comes From

### Firebase Console Navigation:

```
Firebase Console
    ↓
Your Project (e.g., "ST-Mobile-App")
    ↓
⚙️ Project Settings
    ↓
Scroll down to "Your apps"
    ↓
Click on your Web App
    ↓
SDK setup and configuration
    ↓
Select "Config" (not npm)
    ↓
COPY the firebaseConfig object
```

---

## 📋 What Each Value Means

### 1. **apiKey**
```javascript
apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```
- **Location**: Project Settings → Your apps → Config
- **Looks like**: Starts with "AIza..."
- **Length**: ~39 characters
- **Purpose**: Identifies your Firebase project

### 2. **authDomain**
```javascript
authDomain: "your-project-id.firebaseapp.com"
```
- **Location**: Project Settings → Your apps → Config
- **Format**: `{project-id}.firebaseapp.com`
- **Purpose**: Authentication domain

### 3. **projectId**
```javascript
projectId: "your-project-id"
```
- **Location**: Project Settings → General tab
- **Also visible**: Top of Firebase Console
- **Format**: lowercase with hyphens
- **Example**: "st-mobile-app"

### 4. **storageBucket**
```javascript
storageBucket: "your-project-id.appspot.com"
```
- **Location**: Project Settings → Your apps → Config
- **Format**: `{project-id}.appspot.com`
- **Purpose**: Cloud Storage bucket

### 5. **messagingSenderId**
```javascript
messagingSenderId: "123456789012"
```
- **Location**: Project Settings → Cloud Messaging tab
- **Format**: 12-digit number
- **Purpose**: Cloud Messaging sender ID

### 6. **appId**
```javascript
appId: "1:123456789012:web:abcdef1234567890"
```
- **Location**: Project Settings → Your apps → Config
- **Format**: `1:{number}:web:{hash}`
- **Purpose**: Unique app identifier

---

## 🖼️ Screenshot Guide (Text Description)

### Screen 1: Firebase Console Home
```
┌─────────────────────────────────────┐
│ Firebase Console                    │
├─────────────────────────────────────┤
│ 📁 Your Projects:                   │
│                                     │
│ ┌─────────────────────┐            │
│ │ ST-Mobile-App       │ ← Click    │
│ │ your-project-id     │            │
│ └─────────────────────┘            │
└─────────────────────────────────────┘
```

### Screen 2: Project Overview
```
┌─────────────────────────────────────┐
│ ⚙️ Project Overview    ⚙️ Settings  │ ← Click gear icon
├─────────────────────────────────────┤
│ Get started by adding Firebase...  │
│                                     │
│ Dropdown menu appears:              │
│ ┌─────────────────────┐            │
│ │ Project settings    │ ← Click    │
│ │ Usage and billing   │            │
│ │ Users and permissions│           │
│ └─────────────────────┘            │
└─────────────────────────────────────┘
```

### Screen 3: Project Settings
```
┌─────────────────────────────────────┐
│ Project settings                    │
├─────────────────────────────────────┤
│ General | Cloud Messaging | ...    │
│                                     │
│ Your project:                       │
│ Project name: ST-Mobile-App         │
│ Project ID: st-mobile-app           │
│                                     │
│ [Scroll Down ↓]                     │
│                                     │
│ Your apps:                          │
│ ┌─────────────────────┐            │
│ │ </> Web App         │ ← Your app │
│ │ ST Mobile App       │            │
│ └─────────────────────┘            │
└─────────────────────────────────────┘
```

### Screen 4: App Configuration
```
┌─────────────────────────────────────┐
│ SDK setup and configuration         │
├─────────────────────────────────────┤
│ ( ) npm  (•) Config  ← Select Config│
│                                     │
│ const firebaseConfig = {            │
│   apiKey: "AIzaSy...",             │
│   authDomain: "xxx.firebaseapp.com",│
│   projectId: "xxx",                 │
│   storageBucket: "xxx.appspot.com", │
│   messagingSenderId: "123...",      │
│   appId: "1:123..."                 │
│ };                                  │
│                                     │
│ [Copy] ← Click to copy              │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Copy Method

### Option 1: Copy from Firebase Console

1. **Go to**: https://console.firebase.google.com/
2. **Click**: Your project
3. **Click**: ⚙️ (gear icon) → "Project settings"
4. **Scroll**: Down to "Your apps"
5. **Click**: Your web app
6. **Select**: "Config" radio button
7. **Click**: Copy icon or select all text
8. **Paste**: Into your `firebase.config.js`

### Option 2: Use Firebase CLI (Alternative)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Get your config
firebase apps:sdkconfig web
```

---

## ✅ Verification Checklist

After copying your config, verify:

- [ ] `apiKey` starts with "AIza"
- [ ] `authDomain` ends with ".firebaseapp.com"
- [ ] `projectId` matches your project name
- [ ] `storageBucket` ends with ".appspot.com"
- [ ] `messagingSenderId` is a 12-digit number
- [ ] `appId` starts with "1:" and contains ":web:"
- [ ] No placeholder text like "YOUR_API_KEY"
- [ ] All values are in quotes
- [ ] Commas after each line (except last)

---

## 📝 Example: Before and After

### Before (Placeholder):
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                           ❌
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",    ❌
  projectId: "YOUR_PROJECT_ID",                     ❌
  storageBucket: "YOUR_PROJECT_ID.appspot.com",     ❌
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",    ❌
  appId: "YOUR_APP_ID"                              ❌
};
```

### After (Real Values):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",   ✅
  authDomain: "st-mobile-app.firebaseapp.com",      ✅
  projectId: "st-mobile-app",                       ✅
  storageBucket: "st-mobile-app.appspot.com",       ✅
  messagingSenderId: "123456789012",                ✅
  appId: "1:123456789012:web:abc123def456"          ✅
};
```

---

## 🔗 Direct Links

1. **Firebase Console**: https://console.firebase.google.com/
2. **Your Project**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general
3. **Project Settings**: Click ⚙️ → Project settings

---

## ❓ Common Questions

### Q: I don't see "Your apps" section
**A**: You need to register an app first. Click the Web icon `</>` to add one.

### Q: I see multiple apps, which one?
**A**: Use the one you just created. It should show the name you gave it (e.g., "ST Mobile App").

### Q: Can I regenerate these values?
**A**: The apiKey can be restricted but not changed. If compromised, create a new app.

### Q: Are these values secret?
**A**: The config is not secret (it's in your app), but you should set up Firebase Security Rules to protect your data.

### Q: I lost my config, can I find it again?
**A**: Yes! Follow Method 2 above (Project Settings → Your apps → Config).

---

## 🎯 Next Steps

After copying your config:

1. ✅ Paste into `firebase.config.js`
2. ✅ Replace ALL placeholder values
3. ✅ Save the file
4. ✅ Run `npm install` (if not done)
5. ✅ Test your app

---

**Need Help?** If you can't find your config, make sure you've:
1. Created a Firebase project
2. Registered a Web app (clicked the `</>` icon)
3. Completed the registration process

**Status**: 📋 Ready to copy your Firebase configuration!
