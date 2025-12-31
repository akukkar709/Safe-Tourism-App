import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { userStorage } from '../utils/userStorage';

export default function AadharVerificationScreen({ navigation, route }) {
  const { name, email } = route.params || {};
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validateAadhar = () => {
    const newErrors = {};

    if (!aadharNumber.trim()) {
      newErrors.aadhar = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(aadharNumber.replace(/\s/g, ''))) {
      newErrors.aadhar = 'Aadhar number must be 12 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (validateAadhar()) {
      // Here you would typically make an API call to send OTP
      setOtpSent(true);
      Alert.alert(
        'OTP Sent',
        'A 6-digit OTP has been sent to your registered mobile number',
        [{ text: 'OK' }]
      );
    }
  };

  const handleVerifyOtp = () => {
    if (validateOtp()) {
      // Verify the user in storage
      const result = userStorage.verifyUser(email);
      
      if (result.success) {
        Alert.alert(
          'Aadhar Verified! ✅',
          `Great ${name}! Now let's verify your face for complete account setup.`,
          [
            {
              text: 'Continue',
              onPress: () => {
                // Navigate to face verification screen
                navigation.navigate('FaceVerification', {
                  name: name,
                  email: email,
                });
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', result.message);
      }
    }
  };

  const formatAadharNumber = (text) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Limit to 12 digits
    const limited = cleaned.slice(0, 12);
    // Format as XXXX XXXX XXXX
    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Aadhar Verification</Text>
          <Text style={styles.subtitle}>
            Verify your identity with Aadhar
          </Text>

          {/* User Info Display */}
          {name && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Name: </Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
          )}
          {email && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email: </Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          )}

          {/* Aadhar Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              style={[styles.input, errors.aadhar && styles.inputError]}
              placeholder="XXXX XXXX XXXX"
              placeholderTextColor="#9ca3af"
              value={aadharNumber}
              onChangeText={(text) => {
                const formatted = formatAadharNumber(text);
                setAadharNumber(formatted);
                if (errors.aadhar) {
                  setErrors({ ...errors, aadhar: null });
                }
              }}
              keyboardType="number-pad"
              maxLength={14} // 12 digits + 2 spaces
              editable={!otpSent}
            />
            {errors.aadhar && (
              <Text style={styles.errorText}>{errors.aadhar}</Text>
            )}
            <Text style={styles.helperText}>
              Enter your 12-digit Aadhar number
            </Text>
          </View>

          {/* Send OTP Button */}
          {!otpSent && (
            <TouchableOpacity
              style={styles.sendOtpButton}
              onPress={handleSendOtp}
              activeOpacity={0.8}
            >
              <Text style={styles.sendOtpButtonText}>Send OTP</Text>
            </TouchableOpacity>
          )}

          {/* OTP Input - Only shown after OTP is sent */}
          {otpSent && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter OTP</Text>
                <TextInput
                  style={[styles.input, errors.otp && styles.inputError]}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#9ca3af"
                  value={otp}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/\D/g, '').slice(0, 6);
                    setOtp(cleaned);
                    if (errors.otp) {
                      setErrors({ ...errors, otp: null });
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                {errors.otp && (
                  <Text style={styles.errorText}>{errors.otp}</Text>
                )}
              </View>

              {/* Verify OTP Button */}
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyOtp}
                activeOpacity={0.8}
              >
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              </TouchableOpacity>

              {/* Resend OTP */}
              <TouchableOpacity
                style={styles.resendContainer}
                onPress={handleSendOtp}
              >
                <Text style={styles.resendText}>Didn't receive OTP? </Text>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Security Note */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              🔒 Your Aadhar information is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
    marginBottom: 24,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
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
  helperText: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  sendOtpButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendOtpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#6b7280',
    fontSize: 14,
  },
  resendLink: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  noteContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  noteText: {
    color: '#065f46',
    fontSize: 12,
    textAlign: 'center',
  },
});
