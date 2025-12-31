import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { userStorage } from '../utils/userStorage';

export default function UserProfileScreen({ navigation, route }) {
  const { email } = route.params || {};
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
    if (email) {
      const user = userStorage.getUserByEmail(email);
      if (user) {
        setUserData(user);
      } else {
        Alert.alert('Error', 'User not found');
        navigation.navigate('Login');
      }
    }
  }, [email]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>Welcome to your account</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Profile Image */}
          <View style={styles.imageSection}>
            {userData.faceImage ? (
              <Image
                source={{ uri: userData.faceImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderIcon}>👤</Text>
              </View>
            )}
            {userData.faceVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>

          {/* User Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{userData.name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Status</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    userData.isVerified && styles.statusDotActive,
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    userData.isVerified && styles.statusTextActive,
                  ]}
                >
                  {userData.isVerified ? 'Active' : 'Pending Verification'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>
                {new Date(userData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          {/* Verification Status */}
          <View style={styles.verificationSection}>
            <Text style={styles.verificationTitle}>Verification Status</Text>

            <View style={styles.verificationItem}>
              <Text style={styles.verificationIcon}>
                {userData.isVerified ? '✅' : '⏳'}
              </Text>
              <View style={styles.verificationInfo}>
                <Text style={styles.verificationLabel}>
                  Aadhar Verification
                </Text>
                <Text style={styles.verificationStatus}>
                  {userData.isVerified ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>

            <View style={styles.verificationItem}>
              <Text style={styles.verificationIcon}>
                {userData.faceVerified ? '✅' : '⏳'}
              </Text>
              <View style={styles.verificationInfo}>
                <Text style={styles.verificationLabel}>Face Verification</Text>
                <Text style={styles.verificationStatus}>
                  {userData.faceVerified ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.appButton}
            onPress={() => navigation.navigate('Home', { 
              email: email,
              name: userData.name 
            })}
            activeOpacity={0.8}
          >
            <Text style={styles.appButtonText}>🏠 Go to App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Your information is secure and encrypted
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileCard: {
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
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#6366f1',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d1d5db',
  },
  placeholderIcon: {
    fontSize: 64,
  },
  verifiedBadge: {
    marginTop: 12,
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    paddingVertical: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fbbf24',
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 16,
    color: '#f59e0b',
    fontWeight: '500',
  },
  statusTextActive: {
    color: '#10b981',
  },
  verificationSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  verificationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  verificationInfo: {
    flex: 1,
  },
  verificationLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  verificationStatus: {
    fontSize: 12,
    color: '#6b7280',
  },
  appButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  appButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  securityText: {
    color: '#065f46',
    fontSize: 12,
    textAlign: 'center',
  },
});
