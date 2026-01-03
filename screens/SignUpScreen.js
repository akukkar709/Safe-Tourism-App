// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { userStorage } from '../utils/userStorage';

// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};

//     if (!name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = () => {
//     if (!validateForm()) return;

//     const result = userStorage.registerUser({
//       name,
//       email,
//       password,
//     });

//     if (result.success) {
//       Alert.alert(
//         'Account Created',
//         'Please complete verification to continue',
//         [
//           {
//             text: 'Continue',
//             onPress: () =>
//               navigation.navigate('AadharVerification', {
//                 name,
//                 email,
//               }),
//           },
//         ]
//       );

//       setName('');
//       setEmail('');
//       setPassword('');
//       setErrors({});
//     } else {
//       Alert.alert('Sign Up Failed', result.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar style="light" />
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>
//             Sign up to get started
//           </Text>

//           {/* Name */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Full Name</Text>
//             <TextInput
//               style={[styles.input, errors.name && styles.inputError]}
//               placeholder="Enter your full name"
//               placeholderTextColor="#9ca3af"
//               value={name}
//               onChangeText={(text) => {
//                 setName(text);
//                 if (errors.name) setErrors({ ...errors, name: null });
//               }}
//             />
//             {errors.name && (
//               <Text style={styles.errorText}>{errors.name}</Text>
//             )}
//           </View>

//           {/* Email */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, errors.email && styles.inputError]}
//               placeholder="Enter your email"
//               placeholderTextColor="#9ca3af"
//               value={email}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 if (errors.email) setErrors({ ...errors, email: null });
//               }}
//               autoCapitalize="none"
//               keyboardType="email-address"
//             />
//             {errors.email && (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             )}
//           </View>

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={[styles.input, errors.password && styles.inputError]}
//               placeholder="Create a password"
//               placeholderTextColor="#9ca3af"
//               value={password}
//               onChangeText={(text) => {
//                 setPassword(text);
//                 if (errors.password)
//                   setErrors({ ...errors, password: null });
//               }}
//               secureTextEntry
//               autoCapitalize="none"
//             />
//             {errors.password && (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             )}
//           </View>

//           {/* Sign Up Button */}
//           <TouchableOpacity
//             style={styles.signUpButton}
//             onPress={handleSignUp}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//           </TouchableOpacity>

//           {/* Login Link */}
//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>
//               Already have an account?{' '}
//             </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.loginLink}>Log In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 24,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginBottom: 32,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#f9fafb',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   inputError: {
//     borderColor: '#ef4444',
//   },
//   errorText: {
//     color: '#ef4444',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   signUpButton: {
//     backgroundColor: '#39ca22ff',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   signUpButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   loginText: {
//     color: '#6b7280',
//     fontSize: 14,
//   },
//   loginLink: {
//     color: '#39ca22ff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });




import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { userStorage } from '../utils/userStorage';


const { width } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '' });
  
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    
    // Slide in animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease)
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      ]),
      Animated.delay(3000),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease)
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      setNotification({ ...notification, visible: false });
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    const result = userStorage.registerUser({ name, email, password });

    if (result.success) {
      showNotification('Account created successfully!');
      setTimeout(() => {
        navigation.navigate('AadharVerification', { name, email });
      }, 1500);
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    } else {
      showNotification('❌ ' + (result.message || 'Sign up failed'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar style="dark" />
        
        {/* Notification */}
        {notification.visible && (
          <Animated.View 
            style={[
              styles.notification,
              {
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              }
            ]}
          >
             <View style={styles.notificationIcon}></View>
            <MaterialIcons 
              name={notification.message.includes('successfully') ? "check-circle" : "error"} 
              size={24} 
              color="#fff" 
            />
            <Text style={styles.notificationText}>{notification.message}</Text>
          </Animated.View>
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {/* Form fields remain the same */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Create a password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  signUpButton: {
    backgroundColor: '#39ca22ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
    shadowColor: '#39ca22ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6b7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#39ca22ff',
    fontSize: 14,
    fontWeight: '600',
  },

// notification: {
//   position: 'absolute',
//   top: Platform.OS === 'android' ? StatusBar.currentHeight : 5,
//   left: 0,
//   right: 0,
//   backgroundColor: '#10B981',
//   flexDirection: 'row',
//   alignItems: 'center',
//   padding: 18,
//   zIndex: 1000,
//   elevation: 5,
// },
//   notificationText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '500',
//     marginLeft: 10,
//     flex: 1,
//   },



notification: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#10B981',
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 18,
  paddingHorizontal: 16,
  zIndex: 1000,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
},
notificationText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  marginLeft: 12,
  flex: 1,
  textShadowColor: 'rgba(0, 0, 0, 0.1)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 2,
},
notificationIcon: {
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 8,
},
});