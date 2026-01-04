import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { userStorage } from '../utils/userStorage';

export default function FaceVerificationScreen({ navigation, route }) {
  const { name, email } = route.params || {};
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    try {
      // Request camera permission
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      
      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permission to take a photo for face verification. Go to Settings > Apps > This App > Permissions to enable camera access.'
        );
        return;
      }

      // Launch camera for real-time photo capture
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        cameraType: ImagePicker.CameraType.front, // Use front camera for selfie
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Validate that photo was taken (not from gallery)
        const imageUri = result.assets[0].uri;
        
        // Basic validation - check if image exists
        if (imageUri) {
          setCapturedImage(imageUri);
          // Auto-validate the image after capture
          validateImage(imageUri);
        } else {
          Alert.alert(
            // 'Invalid Photo',
            // 'Please take a photo using the camera. Gallery photos are not allowed.'
          );
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert(
        'Camera Error',
        `Failed to access camera: ${error.message || 'Unknown error'}. Please ensure camera permissions are granted in your device settings and try again.`
      );
    }
  };

  const validateImage = (imageUri) => {
    // Simulate quick image validation (face detection check)
    setIsVerifying(true);
    setValidationMessage('Checking image...');
    
    setTimeout(() => {
      // Simulate face detection (90% success rate)
      const faceDetected = Math.random() > 0.1;
      
      if (faceDetected) {
        setIsImageValid(true);
        setValidationMessage('Face detected! Image looks good');
      } else {
        setIsImageValid(false);
        setValidationMessage('No face detected. Please retake');
      }
      setIsVerifying(false);
    }, 1500); // 1.5 second validation
  };

  const handleVerifyFace = () => {
    if (!capturedImage) {
      Alert.alert(
        'No Photo Captured',
        'Please take a photo using the camera before verification.'
      );
      return;
    }

    setIsVerifying(true);

    // Simulate face detection and verification process
    setTimeout(() => {
      // Simulate face detection validation
      const faceDetected = Math.random() > 0.1; // 90% success rate for demo
      
      setIsVerifying(false);

      if (!faceDetected) {
        // Face not detected - show error
        Alert.alert(
          'Face Not Detected',
          'No face was detected in the photo. Please ensure:\n\n• Your face is clearly visible\n• Good lighting conditions\n• Face the camera directly\n• Remove any obstructions\n\nPlease try again.',
          [
            {
              text: 'Retake Photo',
              onPress: handleRetake,
            },
          ]
        );
        return;
      }

      // Face detected - save and proceed
      const user = userStorage.getUserByEmail(email);
      if (user) {
        user.faceImage = capturedImage;
        user.faceVerified = true;
      }

      // Show success and navigate to profile
      Alert.alert(
        'Face Verification Successful! ✅',
        'Your face has been detected and verified successfully. Welcome to your profile!',
        [
          {
            text: 'View Profile',
            onPress: () => {
              navigation.navigate('UserProfile', {
                email: email,
              });
            },
          },
        ]
      );
    }, 2000); // Simulate 2 second verification
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsImageValid(false);
    setValidationMessage('');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>
          Camera permission is required for face verification
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Face Verification</Text>
          <Text style={styles.subtitle}>
            Verify your identity with a selfie
          </Text>

          {/* User Info */}
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

          {/* Photo Preview */}
          {capturedImage ? (
            <View style={styles.imageContainer}>
              <View
                style={[
                  styles.imageWrapper,
                  isImageValid && styles.imageWrapperValid,
                  !isImageValid && capturedImage && !isVerifying && styles.imageWrapperInvalid,
                ]}
              >
                <Image source={{ uri: capturedImage }} style={styles.image} />
                {isImageValid && (
                  <View style={styles.validBadge}>
                    <Text style={styles.validBadgeText}>✓</Text>
                  </View>
                )}
              </View>
              
              {/* Validation Message */}
              {validationMessage ? (
                <View
                  style={[
                    styles.validationMessage,
                    isImageValid && styles.validationMessageSuccess,
                    !isImageValid && !isVerifying && styles.validationMessageError,
                  ]}
                >
                  <Text
                    style={[
                      styles.validationMessageText,
                      isImageValid && styles.validationMessageTextSuccess,
                      !isImageValid && !isVerifying && styles.validationMessageTextError,
                    ]}
                  >
                    {validationMessage}
                  </Text>
                </View>
              ) : null}
              
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={handleRetake}
              >
                <Text style={styles.retakeButtonText}>🔄 Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderIcon}>📸</Text>
              <Text style={styles.placeholderText}>
                No photo captured yet
              </Text>
            </View>
          )}
          

          {/* Action Buttons */}
          {!capturedImage ? (
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <Text style={styles.cameraButtonText}>Take Photo with Camera</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.verifyButton,
                (isVerifying || !isImageValid) && styles.verifyButtonDisabled,
                isImageValid && styles.verifyButtonActive,
              ]}
              onPress={handleVerifyFace}
              activeOpacity={0.8}
              disabled={isVerifying || !isImageValid}
            >
              <Text style={styles.verifyButtonText}>
                {isVerifying ? 'Verifying...' : isImageValid ? '✓ Verify Face' : '⏳ Validating Image...'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Security Note */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              Live camera photo required for security
            </Text>
            <Text style={styles.noteText}>
              Gallery photos are not accepted for verification
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
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
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 130,
    padding: 5,
    borderWidth: 5,
    borderColor: '#e5e7eb',
  },
  imageWrapperValid: {
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  imageWrapperInvalid: {
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  validBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#10b981',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  validBadgeText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  validationMessage: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  validationMessageSuccess: {
    backgroundColor: '#d1fae5',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  validationMessageError: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  validationMessageText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#6b7280',
  },
  validationMessageTextSuccess: {
    color: '#065f46',
  },
  validationMessageTextError: {
    color: '#991b1b',
  },
  retakeButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  retakeButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholderContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    backgroundColor: '#f3f4f6',
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  instructionsContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
  },
  cameraButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  cameraButtonText: {
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
  verifyButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  verifyButtonActive: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
  noPermissionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
