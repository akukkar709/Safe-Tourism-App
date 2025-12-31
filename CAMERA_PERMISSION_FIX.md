# 📸 Camera Permission Fix

## ✅ Changes Made

### 1. **Updated app.json**
Added camera permissions for both iOS and Android:

**iOS Permissions:**
- `NSCameraUsageDescription` - Camera access for face verification
- `NSPhotoLibraryUsageDescription` - Photo library access

**Android Permissions:**
- `CAMERA` - Camera access
- `READ_EXTERNAL_STORAGE` - Read storage
- `WRITE_EXTERNAL_STORAGE` - Write storage

**Expo Plugins:**
- `expo-camera` plugin with permission message
- `expo-image-picker` plugin with permission message

### 2. **Fixed FaceVerificationScreen.js**
- Removed `CameraType` import (not available in this Expo version)
- Used `ImagePicker.CameraType.front` instead
- Enhanced error handling with detailed messages
- Added console.error for debugging
- Better permission request handling
- Added validation for result.assets

## 🔧 How to Fix

### Step 1: Stop the Current Server
Press `Ctrl + C` in the terminal where Expo is running

### Step 2: Clear Cache and Restart
Run these commands:

```powershell
# Clear Expo cache
npx expo start -c

# OR if that doesn't work, use:
npm start -- --reset-cache
```

### Step 3: Rebuild the App
Since we changed `app.json`, you need to rebuild:

**For Expo Go:**
- Close Expo Go app completely
- Reopen Expo Go
- Scan QR code again

**For Development Build:**
```powershell
# For Android
npx expo run:android

# For iOS
npx expo run:ios
```

### Step 4: Grant Permissions
When you open the app:
1. Navigate to Face Verification screen
2. Click "Take Photo with Camera"
3. **Allow camera permission** when prompted
4. Take photo

## 🚨 If Still Not Working

### Option 1: Check Device Settings
**Android:**
1. Go to Settings > Apps
2. Find your app
3. Go to Permissions
4. Enable Camera permission

**iOS:**
1. Go to Settings > Privacy > Camera
2. Find your app
3. Enable Camera access

### Option 2: Reinstall the App
```powershell
# Uninstall from device/emulator
# Then run:
npx expo start -c
```

### Option 3: Check Expo Go Version
Make sure you're using the latest Expo Go:
- Android: Update from Play Store
- iOS: Update from App Store

### Option 4: Use Development Build
If Expo Go still has issues, create a development build:

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build --profile development --platform android

# Build for iOS
eas build --profile development --platform ios
```

## 🧪 Testing Camera Access

### Test 1: Permission Request
1. Open app
2. Go to Face Verification
3. Should see permission request popup
4. Click "Allow"

### Test 2: Camera Opens
1. Click "Take Photo with Camera"
2. Camera should open (front-facing)
3. Take photo
4. Photo should appear in preview

### Test 3: Error Handling
If camera fails:
- Should see detailed error message
- Error includes: "Failed to access camera: [error details]"
- Instructions to check settings

## 📱 Platform-Specific Notes

### Android
- Requires `CAMERA` permission in manifest
- Auto-added by Expo when using expo-camera
- May need to manually grant in Settings if denied

### iOS
- Requires `NSCameraUsageDescription` in Info.plist
- Auto-added by Expo plugins
- Must rebuild app after adding permissions

### Web
- Camera API requires HTTPS
- Browser will prompt for permission
- May not work in all browsers

## 🔍 Debugging

### Check if permissions are in app.json
```json
{
  "expo": {
    "plugins": [
      ["expo-camera", { ... }],
      ["expo-image-picker", { ... }]
    ],
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "..."
      }
    },
    "android": {
      "permissions": ["CAMERA", ...]
    }
  }
}
```

### Check Console Logs
The app now logs camera errors:
```javascript
console.error('Camera error:', error);
```

Check terminal/console for error details.

### Common Errors

**Error: "Camera permission not granted"**
- Solution: Grant permission in device settings

**Error: "Camera not available"**
- Solution: Check if device has camera
- Check if another app is using camera

**Error: "expo-camera not installed"**
- Solution: Run `npx expo install expo-camera`

**Error: "Module not found"**
- Solution: Run `npm install` and restart

## ✅ Expected Behavior After Fix

1. **First Time:**
   - App requests camera permission
   - User grants permission
   - Camera opens successfully

2. **Subsequent Times:**
   - Camera opens immediately
   - No permission prompt (already granted)
   - Front camera opens for selfie

3. **If Permission Denied:**
   - Clear error message
   - Instructions to enable in Settings
   - Option to retry

## 🚀 Quick Fix Commands

```powershell
# Stop server (Ctrl+C), then:

# 1. Clear cache and restart
npx expo start -c

# 2. If that doesn't work, reinstall packages
npm install
npx expo start -c

# 3. If still not working, check package installation
npx expo install expo-camera expo-image-picker

# 4. Restart with clean slate
npx expo start -c --clear
```

## 📋 Checklist

- ✅ Updated app.json with permissions
- ✅ Added expo-camera plugin
- ✅ Added expo-image-picker plugin
- ✅ Fixed FaceVerificationScreen.js
- ✅ Enhanced error handling
- ⏳ Restart Expo server with cache clear
- ⏳ Grant camera permission on device
- ⏳ Test camera functionality

---

**Next Steps:**
1. Stop the current Expo server
2. Run: `npx expo start -c`
3. Reopen app in Expo Go
4. Grant camera permission when prompted
5. Test face verification!
