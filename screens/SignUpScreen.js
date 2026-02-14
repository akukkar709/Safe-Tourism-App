import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    let timer;
    if (isResendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  const handleSendOtp = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!/^\+91\d{10}$/.test(mobile)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number with +91');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate OTP sending for now
      setTimeout(() => {
        setVerificationId('mock_verification_id');
        setShowOtpField(true);
        setIsResendDisabled(true);
        setCountdown(30);
        Alert.alert('Success', 'OTP sent to your mobile number');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', error.message || 'Failed to send OTP');
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResendDisabled) return;
    await handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setIsLoading(true);
      // For testing, accept any 6-digit OTP
      if (otp.length === 6) {
        Alert.alert('Success', 'Mobile number verified successfully');
        navigation.navigate('AadharVerification', { name, mobile });
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="person-add" size={28} color="#4A80F5" />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Ionicons name="shield-checkmark" size={60} color="#4A80F5" />
          </View>
          <Text style={styles.welcomeText}>Welcome to Safe Tourism</Text>
          <Text style={styles.subtitle}>Enter your details to get started</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="phone-portrait-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number (with +91)"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              editable={!showOtpField}
            />
          </View>

          {showOtpField && (
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <Ionicons name="keypad-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                placeholderTextColor="#999"
              />
            </View>
          )}

          {showOtpField && (
            <TouchableOpacity 
              style={[styles.resendButton, isResendDisabled && styles.disabledButton]}
              onPress={handleResendOtp}
              disabled={isResendDisabled}
            >
              <Text style={styles.resendText}>
                {isResendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.primaryButton, isLoading && styles.disabledButton]} 
            onPress={showOtpField ? handleVerifyOtp : handleSendOtp}
            disabled={isLoading}
          >
            <LinearGradient
              colors={showOtpField ? ['#4CAF50', '#2E7D32'] : ['#4A80F5', '#3B5998']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {showOtpField ? 'Verify OTP' : 'Send OTP'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  scrollView: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 56,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  primaryButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  gradientButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  resendText: {
    color: '#4A80F5',
    fontSize: 14,
    fontWeight: '500',
  },
  termsContainer: {
    marginTop: 24,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#4A80F5',
    fontWeight: '500',
  },
});

export default SignUpScreen;
