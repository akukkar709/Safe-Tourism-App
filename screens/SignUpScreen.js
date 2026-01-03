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
//   ActivityIndicator,
// } from 'react-native';
// // import { StatusBar } from 'expo-status-bar';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from "../firebaseServices";


// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);




//   const validateForm = () => {
//     const newErrors = {};

//     if (!name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = async () => {
//     if (validateForm()) {
//       setLoading(true);

//       try {
//         // Create user with Firebase Authentication
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Store additional user data in Firestore
//         await setDoc(doc(db, 'users', user.uid), {
//           name: name,
//           email: email,
//           createdAt: new Date(),
//         });

//         setLoading(false);

//         // Show success message
//         Alert.alert(
//           'Account Created!',
//           `Welcome ${name}! Please complete Aadhar verification to activate your account.`,
//           [
//             {
//               text: 'Continue',
//               onPress: () => {
//                 // Navigate to Aadhar verification screen
//                 navigation.navigate('AadharVerification', {
//                   name: name,
//                   email: email,
//                   userId: user.uid,
//                 });
//               }
//             }
//           ]
//         );

//         // Clear form
//         setName('');
//         setEmail('');
//         setPassword('');
//         setErrors({});

//       } catch (error) {
//         setLoading(false);

//         // Handle Firebase errors
//         let errorMessage = 'Failed to create account. Please try again.';

//         if (error.code === 'auth/email-already-in-use') {
//           errorMessage = 'This email is already registered. Please log in instead.';
//           Alert.alert(
//             'Email Already Registered',
//             errorMessage,
//             [
//               { text: 'Cancel', style: 'cancel' },
//               { 
//                 text: 'Go to Login', 
//                 onPress: () => navigation.navigate('Login')
//               }
//             ]
//           );
//         } else if (error.code === 'auth/weak-password') {
//           errorMessage = 'Password is too weak. Please use a stronger password.';
//           Alert.alert('Weak Password', errorMessage);
//         } else if (error.code === 'auth/invalid-email') {
//           errorMessage = 'Invalid email address.';
//           Alert.alert('Invalid Email', errorMessage);
//         } else if (error.code === 'auth/network-request-failed') {
//           errorMessage = 'Network error. Please check your internet connection.';
//           Alert.alert('Network Error', errorMessage);
//         } else {
//           Alert.alert('Error', errorMessage);
//         }

//         console.error('Sign up error:', error);
//       }
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
//           <Text style={styles.title}>Sign Up</Text>
//           <Text style={styles.subtitle}>Create your account</Text>

//           {/* Name Input */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={[styles.input, errors.name && styles.inputError]}
//               placeholder="Enter your full name"
//               placeholderTextColor="#9ca3af"
//               value={name}
//               onChangeText={(text) => {
//                 setName(text);
//                 if (errors.name) {
//                   setErrors({ ...errors, name: null });
//                 }
//               }}
//               autoCapitalize="words"
//             />
//             {errors.name && (
//               <Text style={styles.errorText}>{errors.name}</Text>
//             )}
//           </View>

//           {/* Email Input */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={[styles.input, errors.email && styles.inputError]}
//               placeholder="Enter your email address"
//               placeholderTextColor="#9ca3af"
//               value={email}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 if (errors.email) {
//                   setErrors({ ...errors, email: null });
//                 }
//               }}
//               autoCapitalize="none"
//               autoCorrect={false}
//               keyboardType="email-address"
//             />
//             {errors.email && (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             )}
//           </View>

//           {/* Password Input */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={[styles.input, errors.password && styles.inputError]}
//               placeholder="Create a password"
//               placeholderTextColor="#9ca3af"
//               value={password}
//               onChangeText={(text) => {
//                 setPassword(text);
//                 if (errors.password) {
//                   setErrors({ ...errors, password: null });
//                 }
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
//             style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
//             onPress={handleSignUp}
//             activeOpacity={0.8}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#ffffff" size="small" />
//             ) : (
//               <Text style={styles.signUpButtonText}>Sign Up</Text>
//             )}
//           </TouchableOpacity>

//           {/* Already have account */}
//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.loginLink}>Log In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }



// src/screens/SignUpScreen.js
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseServices";

const SignUpScreen = () => {
  // ✅ Hooks allowed here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      console.log("User registered");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;


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
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
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
//     shadowColor: '#63f16dff',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   signUpButtonDisabled: {
//     backgroundColor: '#9ca3af',
//     shadowOpacity: 0.1,
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


// import React, { useState } from "react";
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
//   ActivityIndicator,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase"; // ✅ ONLY ONE IMPORT

// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!name.trim()) newErrors.name = "Name is required";

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Enter a valid email";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Minimum 6 characters required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = async () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       // 🔐 Create user
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const user = userCredential.user;

//       // 🗄 Store user in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         email,
//         createdAt: new Date(),
//         aadharVerified: false,
//         profileComplete: false,
//       });

//       setLoading(false);

//       Alert.alert(
//         "Account Created 🎉",
//         `Welcome ${name}!`,
//         [
//           {
//             text: "Continue",
//             onPress: () =>
//               navigation.navigate("AadharVerification", {
//                 userId: user.uid,
//               }),
//           },
//         ]
//       );

//       setName("");
//       setEmail("");
//       setPassword("");
//       setErrors({});
//     } catch (error) {
//       setLoading(false);

//       if (error.code === "auth/email-already-in-use") {
//         Alert.alert(
//           "Email Exists",
//           "This email is already registered",
//           [
//             { text: "Cancel", style: "cancel" },
//             { text: "Login", onPress: () => navigation.navigate("Login") },
//           ]
//         );
//       } else if (error.code === "auth/weak-password") {
//         Alert.alert("Weak Password", "Use a stronger password");
//       } else if (error.code === "auth/invalid-email") {
//         Alert.alert("Invalid Email", "Enter a valid email address");
//       } else {
//         Alert.alert("Error", error.message);
//       }

//       console.log("Signup error:", error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <StatusBar style="dark" />
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.card}>
//           <Text style={styles.title}>Sign Up</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleSignUp}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Create Account</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.link}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f3f4f6" },
//   scroll: { flexGrow: 1, justifyContent: "center", padding: 20 },
//   card: {
//     backgroundColor: "#fff",
//     padding: 24,
//     borderRadius: 16,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 12,
//   },
//   button: {
//     backgroundColor: "#39ca22",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   link: {
//     textAlign: "center",
//     marginTop: 16,
//     color: "#2563eb",
//   },
// });
