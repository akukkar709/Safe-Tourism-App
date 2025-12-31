# Mobile Expo App - Sign Up

A React Native mobile application built with Expo featuring a beautiful sign-up page.

## Features

- **Sign Up Page** with:
  - Name field
  - Username field
  - Password field (secure entry)
  - Form validation
  - Modern UI design with shadows and smooth interactions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (iOS/Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Open on Android emulator/device
- `npm run ios` - Open on iOS simulator/device
- `npm run web` - Open in web browser

## Project Structure

```
ST/
├── screens/
│   └── SignUpScreen.js    # Sign up page with form validation
├── App.js                 # Main app entry with navigation
├── package.json           # Dependencies and scripts
├── app.json              # Expo configuration
└── babel.config.js       # Babel configuration
```

## Form Validation

The sign-up form includes validation for:
- **Name**: Required field
- **Username**: Required, minimum 3 characters
- **Password**: Required, minimum 6 characters

## Technologies Used

- **Expo** ~50.0.0
- **React Native** 0.73.0
- **React Navigation** 6.x
- **React** 18.2.0

## Next Steps

To integrate with a backend:
1. Add API endpoint configuration
2. Implement authentication service
3. Connect the `handleSignUp` function to your API
4. Add loading states and error handling
5. Navigate to home screen after successful registration

## License

MIT
