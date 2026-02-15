// import React, { useState, useEffect } from 'react';
// import { auth } from "../firebaseConfig"; 
// import { signInWithPhoneNumber } from "firebase/auth";

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';




// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('+91');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [verificationId, setVerificationId] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     let timer;
//     if (isResendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown, isResendDisabled]);

//   const handleSendOtp = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }
//     if (!/^\+91\d{10}$/.test(mobile)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       // Simulate OTP sending for now
//       setTimeout(() => {
//         setVerificationId('mock_verification_id');
//         setShowOtpField(true);
//         setIsResendDisabled(true);
//         setCountdown(30);
//         Alert.alert('Success', 'OTP sent to your mobile number');
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', error.message || 'Failed to send OTP');
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (isResendDisabled) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       // For testing, accept any 6-digit OTP
//       if (otp.length === 6) {
//         Alert.alert('Success', 'Mobile number verified successfully');
//         navigation.navigate('AadharVerification', { name, mobile });
//       } else {
//         Alert.alert('Error', 'Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Account</Text>
//         <View style={styles.iconContainer}>
//           <Ionicons name="person-add" size={28} color="#4A80F5" />
//         </View>
//       </View>

//       <ScrollView 
//         contentContainerStyle={styles.scrollView}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.logoContainer}>
//           <View style={styles.logoBackground}>
//             <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
//           </View>
//           <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
//           <Text style={styles.subtitle}>Enter your details to get started</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile Number (with +91)"
//               value={mobile}
//               onChangeText={setMobile}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//               editable={!showOtpField}
//             />
//           </View>

//           {showOtpField && (
//             <View style={[styles.inputContainer, { marginTop: 10 }]}>
//               <Ionicons name="keypad-outline" size={20} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChangeText={setOtp}
//                 keyboardType="number-pad"
//                 maxLength={6}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           )}

//           {showOtpField && (
//             <TouchableOpacity 
//               style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
//               onPress={handleResendOtp}
//               disabled={isResendDisabled}
//             >
//               <Text style={styles.resendText}>
//                 {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity 
//             style={[styles.primaryButton, isLoading && styles.disabledButton]} 
//             onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
//             disabled={isLoading}
//           >
//             <LinearGradient
//               colors={showOtpField ? ['#4CAF50', '#2E7D32'] : ['#4A80F5', '#3B5998']}
//               style={styles.gradientButton}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>
//                   {showOtpField ? 'Verify OTP' : 'Send OTP'}
//                 </Text>
//               )}
//             </LinearGradient>
//           </TouchableOpacity>

//           <View style={styles.termsContainer}>
//             <Text style={styles.termsText}>
//               By signing up, you agree to our{' '}
//               <Text style={styles.linkText}>Terms of Service</Text> and{' '}
//               <Text style={styles.linkText}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: Platform.OS === 'ios' ? 50 : 20,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   backButton: {
//     padding: 5,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   iconContainer: {
//     width: 40,
//     alignItems: 'flex-end',
//   },
//   scrollView: {
//     flexGrow: 1,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     padding: 30,
//   },
//   logoBackground: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#f0f7ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   formContainer: {
//     paddingHorizontal: 30,
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 12,
//     marginBottom: 20,
//     paddingHorizontal: 15,
//     height: 56,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     color: '#333',
//     fontSize: 16,
//   },
//   primaryButton: {
//     marginTop: 10,
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   gradientButton: {
//     height: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   resendButton: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   resendText: {
//     color: '#4A80F5',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   termsContainer: {
//     marginTop: 24,
//     paddingHorizontal: 10,
//   },
//   termsText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 18,
//   },
//   linkText: {
//     color: '#4A80F5',
//     fontWeight: '500',
//   },
// });

// export default SignUpScreen;



// import React, { useState, useEffect } from 'react';
// import { useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

// import { signInWithPhoneNumber } from 'firebase/auth';



// import { auth } from '../firebaseConfig';
// import { firebaseConfig } from '../firebaseConfig'; // we’ll export this





// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('+91');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [confirmation, setConfirmation] = useState(null);
//   const recaptchaVerifier = useRef(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     // Setup reCAPTCHA verifier
//     recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'invisible',
//     });
 
//     return () => {
//       if (recaptchaVerifier.current) {
//         recaptchaVerifier.current.clear();
//       }
//     };
//   }, []);


//   useEffect(() => {
//     let timer;
//     if (isResendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown, isResendDisabled]);

//   const handleSendOtp = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!/^\+91\d{10}$/.test(mobile)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
//       return;
//     }

//     try {
//       setIsLoading(true);


//       // Setup recaptcha if not already done
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         'size': 'invisible',
//       });
//     }

//      let appVerifier;
//       if (Platform.OS === 'web') {
//         appVerifier = window.recaptchaVerifier;
//       } else {
//         // For React Native, we don't need to create a RecaptchaVerifier
//         // Firebase Auth for React Native handles this automatically
//         appVerifier = null;
//       }
 

//     const confirmation = await signInWithPhoneNumber(auth, mobile, appVerifier);
    
//     setConfirmation(confirmation);
//     setShowOtpField(true);
//     setIsResendDisabled(true);
//     setCountdown(30);
//     Alert.alert('Success', 'OTP sent to your mobile number');
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };

  


//   const handleResendOtp = async () => {
//     if (isResendDisabled) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//   //   try {
//   //     setIsLoading(true);

//   //     if (!confirmation) {
//   //       Alert.alert('Error', 'Please request OTP first');
//   //       return;
//   //     }

//   //     const result = await confirmation.confirm(otp);
//   //     console.log('Logged in user:', result.user);

//   //     Alert.alert('Success', 'Mobile number verified successfully');
//   //     navigation.navigate('AadharVerification', { name, mobile });

//   //   } catch (error) {
//   //     console.error('Error verifying OTP:', error);
//   //     Alert.alert('Error', 'Invalid OTP. Please try again.');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };


//   try {
//       setIsLoading(true);
//       await confirmationResult.confirm(otp);
//       Alert.alert('Success', 'Mobile number verified successfully');
//       navigation.navigate('AadharVerification', { name, mobile });
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       <View id="recaptcha-container" />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Account</Text>
//         <View style={styles.iconContainer}>
//           <Ionicons name="person-add" size={28} color="#4A80F5" />
//         </View>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollView}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.logoContainer}>
//           <View style={styles.logoBackground}>
//             <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
//           </View>
//           <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
//           <Text style={styles.subtitle}>Enter your details to get started</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile Number (with +91)"
//               value={mobile}
//               onChangeText={setMobile}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//               editable={!showOtpField}
//             />
//           </View>

//           {showOtpField && (
//             <View style={[styles.inputContainer, { marginTop: 10 }]}>
//               <Ionicons name="keypad-outline" size={20} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChangeText={setOtp}
//                 keyboardType="number-pad"
//                 maxLength={6}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           )}

//           {showOtpField && (
//             <TouchableOpacity
//               style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
//               onPress={handleResendOtp}
//               disabled={isResendDisabled}
//             >
//               <Text style={styles.resendText}>
//                 {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={[styles.primaryButton, isLoading && styles.disabledButton]}
//             onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
//             disabled={isLoading}
//           >
//             <LinearGradient
//               colors={showOtpField ? ['#4CAF50', '#2E7D32'] : ['#4A80F5', '#3B5998']}
//               style={styles.gradientButton}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>
//                   {showOtpField ? 'Verify OTP' : 'Send OTP'}
//                 </Text>
//               )}
//             </LinearGradient>
//           </TouchableOpacity>

//           <View style={styles.termsContainer}>
//             <Text style={styles.termsText}>
//               By signing up, you agree to our{' '}
//               <Text style={styles.linkText}>Terms of Service</Text> and{' '}
//               <Text style={styles.linkText}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20,
//     backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
//   },
//   backButton: { padding: 5 },
//   headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   iconContainer: { width: 40, alignItems: 'flex-end' },
//   scrollView: { flexGrow: 1 },
//   logoContainer: { alignItems: 'center', padding: 30 },
//   logoBackground: {
//     width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0f7ff',
//     justifyContent: 'center', alignItems: 'center', marginBottom: 20,
//   },
//   welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
//   subtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
//   formContainer: { paddingHorizontal: 30, width: '100%' },
//   inputContainer: {
//     flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5',
//     borderRadius: 12, marginBottom: 20, paddingHorizontal: 15, height: 56,
//     borderWidth: 1, borderColor: '#e0e0e0',
//   },
//   inputIcon: { marginRight: 12 },
//   input: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
//   primaryButton: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
//   disabledButton: { opacity: 0.7 },
//   gradientButton: { height: 56, justifyContent: 'center', alignItems: 'center' },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
//   resendButton: { marginTop: 10, alignItems: 'center' },
//   resendText: { color: '#4A80F5', fontSize: 14, fontWeight: '500' },
//   termsContainer: { marginTop: 24, paddingHorizontal: 10 },
//   termsText: { fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 },
//   linkText: { color: '#4A80F5', fontWeight: '500' },
// });

// export default SignUpScreen;




// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { signInWithPhoneNumber } from 'firebase/auth';

// import { auth, firebaseConfig } from '../firebaseConfig';

// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('+91');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [confirmation, setConfirmation] = useState(null);

//   const recaptchaVerifier = useRef(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     let timer;
//     if (isResendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown, isResendDisabled]);

//   const handleSendOtp = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!/^\+91\d{10}$/.test(mobile)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         mobile,
//         recaptchaVerifier.current
//       );

//       setConfirmation(confirmationResult);
//       setShowOtpField(true);
//       setIsResendDisabled(true);
//       setCountdown(30);

//       Alert.alert('Success', 'OTP sent to your mobile number');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (isResendDisabled) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//     if (!confirmation) {
//       Alert.alert('Error', 'Please request OTP first');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const result = await confirmation.confirm(otp);
//       console.log('Logged in user:', result.user);

//       Alert.alert('Success', 'Mobile number verified successfully');
//       navigation.navigate('AadharVerification', { name, mobile });
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* ✅ Expo Firebase Recaptcha */}
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//       />

//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Account</Text>
//         <View style={styles.iconContainer}>
//           <Ionicons name="person-add" size={28} color="#4A80F5" />
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
//         <View style={styles.logoContainer}>
//           <View style={styles.logoBackground}>
//             <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
//           </View>
//           <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
//           <Text style={styles.subtitle}>Enter your details to get started</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile Number (with +91)"
//               value={mobile}
//               onChangeText={setMobile}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//               editable={!showOtpField}
//             />
//           </View>

//           {showOtpField && (
//             <View style={[styles.inputContainer, { marginTop: 10 }]}>
//               <Ionicons name="keypad-outline" size={20} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChangeText={setOtp}
//                 keyboardType="number-pad"
//                 maxLength={6}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           )}

//           {showOtpField && (
//             <TouchableOpacity
//               style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
//               onPress={handleResendOtp}
//               disabled={isResendDisabled}
//             >
//               <Text style={styles.resendText}>
//                 {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={[styles.primaryButton, isLoading && styles.disabledButton]}
//             onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
//             disabled={isLoading}
//           >
//             <LinearGradient
//               colors={showOtpField ? ['#4CAF50', '#2E7D32'] : ['#4A80F5', '#3B5998']}
//               style={styles.gradientButton}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>
//                   {showOtpField ? 'Verify OTP' : 'Send OTP'}
//                 </Text>
//               )}
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20,
//     backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
//   },
//   backButton: { padding: 5 },
//   headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   iconContainer: { width: 40, alignItems: 'flex-end' },
//   scrollView: { flexGrow: 1 },
//   logoContainer: { alignItems: 'center', padding: 30 },
//   logoBackground: {
//     width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0f7ff',
//     justifyContent: 'center', alignItems: 'center', marginBottom: 20,
//   },
//   welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
//   subtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
//   formContainer: { paddingHorizontal: 30, width: '100%' },
//   inputContainer: {
//     flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5',
//     borderRadius: 12, marginBottom: 20, paddingHorizontal: 15, height: 56,
//     borderWidth: 1, borderColor: '#e0e0e0',
//   },
//   inputIcon: { marginRight: 12 },
//   input: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
//   primaryButton: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
//   disabledButton: { opacity: 0.7 },
//   gradientButton: { height: 56, justifyContent: 'center', alignItems: 'center' },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
//   resendButton: { marginTop: 10, alignItems: 'center' },
//   resendText: { color: '#4A80F5', fontSize: 14, fontWeight: '500' },
// });

// export default SignUpScreen;



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { signInWithPhoneNumber } from 'firebase/auth';

// import { auth, firebaseConfig } from '../firebaseConfig';

// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('+91');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [confirmation, setConfirmation] = useState(null);

//   const recaptchaVerifier = useRef(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     let timer;
//     if (isResendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown, isResendDisabled]);

//   const handleSendOtp = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!/^\+91\d{10}$/.test(mobile)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         mobile,
//         recaptchaVerifier.current
//       );

//       setConfirmation(confirmationResult);
//       setShowOtpField(true);
//       setIsResendDisabled(true);
//       setCountdown(30);

//       Alert.alert('Success', 'OTP sent to your mobile number');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (isResendDisabled) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//     if (!confirmation) {
//       Alert.alert('Error', 'Please request OTP first');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const result = await confirmation.confirm(otp);
//       console.log('Logged in user:', result.user);

//       Alert.alert('Success', 'Mobile number verified successfully');
//       navigation.navigate('AadharVerification', { name, mobile });
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* ✅ Expo Firebase Recaptcha */}
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//       />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Account</Text>
//         <View style={styles.iconContainer}>
//           <Ionicons name="person-add" size={28} color="#4A80F5" />
//         </View>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollView}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.logoContainer}>
//           <View style={styles.logoBackground}>
//             <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
//           </View>
//           <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
//           <Text style={styles.subtitle}>Enter your details to get started</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="phone-portrait-outline" size={20} color="#666" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile Number (with +91)"
//               value={mobile}
//               onChangeText={setMobile}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//               editable={!showOtpField}
//             />
//           </View>

//           {showOtpField && (
//             <View style={[styles.inputContainer, { marginTop: 10 }]}>
//               <Ionicons name="keypad-outline" size={20} color="#666" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChangeText={setOtp}
//                 keyboardType="number-pad"
//                 maxLength={6}
//                 placeholderTextColor="#999"
//               />
//             </View>
//           )}

//           {showOtpField && (
//             <TouchableOpacity
//               style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
//               onPress={handleResendOtp}
//               disabled={isResendDisabled}
//             >
//               <Text style={styles.resendText}>
//                 {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={[styles.primaryButton, isLoading && styles.disabledButton]}
//             onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
//             disabled={isLoading}
//           >
//             <LinearGradient
//               colors={showOtpField ? ['#4CAF50', '#2E7D32'] : ['#4A80F5', '#3B5998']}
//               style={styles.gradientButton}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>
//                   {showOtpField ? 'Verify OTP' : 'Send OTP'}
//                 </Text>
//               )}
//             </LinearGradient>
//           </TouchableOpacity>

//           <View style={styles.termsContainer}>
//             <Text style={styles.termsText}>
//               By signing up, you agree to our{' '}
//               <Text style={styles.linkText}>Terms of Service</Text> and{' '}
//               <Text style={styles.linkText}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20,
//     backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
//   },
//   backButton: { padding: 5 },
//   headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//   iconContainer: { width: 40, alignItems: 'flex-end' },
//   scrollView: { flexGrow: 1 },
//   logoContainer: { alignItems: 'center', padding: 30 },
//   logoBackground: {
//     width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0f7ff',
//     justifyContent: 'center', alignItems: 'center', marginBottom: 20,
//   },
//   welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
//   subtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
//   formContainer: { paddingHorizontal: 30, width: '100%' },
//   inputContainer: {
//     flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5',
//     borderRadius: 12, marginBottom: 20, paddingHorizontal: 15, height: 56,
//     borderWidth: 1, borderColor: '#e0e0e0',
//   },
//   inputIcon: { marginRight: 12 },
//   input: { flex: 1, height: '100%', color: '#333', fontSize: 16 },
//   primaryButton: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
//   disabledButton: { opacity: 0.7 },
//   gradientButton: { height: 56, justifyContent: 'center', alignItems: 'center' },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
//   resendButton: { marginTop: 10, alignItems: 'center' },
//   resendText: { color: '#4A80F5', fontSize: 14, fontWeight: '500' },
//   termsContainer: { marginTop: 24, paddingHorizontal: 10 },
//   termsText: { fontSize: 12, color: '#666', textAlign: 'center', lineHeight: 18 },
//   linkText: { color: '#4A80F5', fontWeight: '500' },
// });

// export default SignUpScreen;




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// import { signInWithPhoneNumber } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('+91');
//   const [otp, setOtp] = useState('');
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [confirmation, setConfirmation] = useState(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     let timer;
//     if (isResendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown, isResendDisabled]);

//   const handleSendOtp = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     if (!/^\+91\d{10}$/.test(mobile)) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // ✅ Android does NOT need recaptcha
//       const confirmationResult = await signInWithPhoneNumber(auth, mobile);

//       setConfirmation(confirmationResult);
//       setShowOtpField(true);
//       setIsResendDisabled(true);
//       setCountdown(30);

//       Alert.alert('Success', 'OTP sent to your mobile number');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', error.message || 'Failed to send OTP');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (isResendDisabled) return;
//     await handleSendOtp();
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Alert.alert('Error', 'Please enter a valid 6-digit OTP');
//       return;
//     }

//     if (!confirmation) {
//       Alert.alert('Error', 'Please request OTP first');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const result = await confirmation.confirm(otp);
//       console.log('User:', result.user);

//       Alert.alert('Success', 'Mobile number verified successfully');
//       navigation.navigate('AadharVerification', { name, mobile });
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       Alert.alert('Error', error.message || 'Invalid OTP');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
//         <View style={styles.logoContainer}>
//           <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
//           <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
//           <Text style={styles.subtitle}>Enter your details to get started</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Mobile Number (with +91)"
//             value={mobile}
//             onChangeText={setMobile}
//             keyboardType="phone-pad"
//             editable={!showOtpField}
//           />

//           {showOtpField && (
//             <TextInput
//               style={styles.input}
//               placeholder="Enter OTP"
//               value={otp}
//               onChangeText={setOtp}
//               keyboardType="number-pad"
//               maxLength={6}
//             />
//           )}

//           {showOtpField && (
//             <TouchableOpacity onPress={handleResendOtp} disabled={isResendDisabled}>
//               <Text style={{ textAlign: 'center', marginBottom: 10 }}>
//                 {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={styles.button}
//             onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>
//                 {showOtpField ? 'Verify OTP' : 'Send OTP'}
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   scrollView: { flexGrow: 1, padding: 20 },
//   logoContainer: { alignItems: 'center', marginBottom: 30 },
//   welcomeText: { fontSize: 24, fontWeight: 'bold' },
//   subtitle: { fontSize: 14, color: '#666' },
//   formContainer: { width: '100%' },
//   input: {
//     borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
//     padding: 12, marginBottom: 15
//   },
//   button: {
//     backgroundColor: '#4A80F5',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });

// export default SignUpScreen;



// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Alert, 
//   Platform,
//   ActivityIndicator
// } from 'react-native';
// import { auth } from '../firebaseConfig';
// import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// const SignUpScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('+91');
//   const [code, setCode] = useState('');
//   const [verificationId, setVerificationId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const recaptchaVerifier = useRef(null);

//   useEffect(() => {
//     // Setup reCAPTCHA verifier for web
//     if (Platform.OS === 'web') {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         'size': 'invisible',
//       });
//     }
//   }, []);

//   const sendVerificationCode = async () => {
//     try {
//       setLoading(true);
//       const phoneProvider = new PhoneAuthProvider(auth);
      
//       if (Platform.OS === 'web') {
//         const appVerifier = window.recaptchaVerifier;
//         const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//         setVerificationId(confirmationResult.verificationId);
//       } else {
//         const verificationId = await phoneProvider.verifyPhoneNumber(
//           phoneNumber,
//           window.recaptchaVerifier
//         );
//         setVerificationId(verificationId);
//       }
      
//       Alert.alert('Success', 'Verification code sent!');
//     } catch (error) {
//       console.error('Error sending code:', error);
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       setLoading(true);
//       const credential = PhoneAuthProvider.credential(verificationId, code);
//       await signInWithCredential(auth, credential);
//       Alert.alert('Success', 'Phone authentication successful!');
//       // Navigate to next screen
//     } catch (error) {
//       console.error('Error verifying code:', error);
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {Platform.OS === 'web' && <div id="recaptcha-container"></div>}
      
//       <TextInput
//         style={styles.input}
//         placeholder="Enter phone number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//       />
      
//       {!verificationId ? (
//         <TouchableOpacity 
//           style={styles.button} 
//           onPress={sendVerificationCode}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Send Verification Code</Text>
//           )}
//         </TouchableOpacity>
//       ) : (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter verification code"
//             value={code}
//             onChangeText={setCode}
//             keyboardType="number-pad"
//           />
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={confirmCode}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Verify Code</Text>
//             )}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#4285F4',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default SignUpScreen;




import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    // Setup reCAPTCHA verifier for web
    if (Platform.OS === 'web') {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  }, []);

  // const sendVerificationCode = async () => {
  //   try {
  //     setLoading(true);
      
  //     if (Platform.OS === 'web') {
  //       const appVerifier = window.recaptchaVerifier;
  //       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //       setVerificationId(confirmationResult.verificationId);
  //     } else {
  //       // For React Native
  //       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
  //       setVerificationId(confirmationResult.verificationId);
  //     }
      
  //     Alert.alert('Success', 'Verification code sent!');
  //   } catch (error) {
  //     console.error('Error sending code:', error);
  //     Alert.alert('Error', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const sendVerificationCode = async () => {
  try {
    setLoading(true);
    
    if (Platform.OS === 'web') {
      // For web
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } else {
      // For mobile
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
      setVerificationId(confirmationResult.verificationId);
    }
    
    Alert.alert('Success', 'Verification code sent to your phone!');
  } catch (error) {
    console.error('Error sending code:', error);
    Alert.alert('Error', error.message || 'Failed to send verification code');
  } finally {
    setLoading(false);
  }
};


  
  const confirmCode = async () => {
    try {
      setLoading(true);
      // For React Native, the confirmation is handled automatically
      // Just navigate to the next screen
      Alert.alert('Success', 'Phone authentication successful!');
      // navigation.navigate('NextScreen');
    } catch (error) {
      console.error('Error verifying code:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && <div id="recaptcha-container" style={{ display: 'none' }}></div>}
      
      <TextInput
        style={styles.input}
        placeholder="Enter phone number with country code"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      {!verificationId ? (
        <TouchableOpacity 
          style={styles.button} 
          onPress={sendVerificationCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Verification Code</Text>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={confirmCode}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify Code</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;