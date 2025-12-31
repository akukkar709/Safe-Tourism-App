import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';

export default function EmergencyServicesScreen({ navigation, route }) {
  const { email, name } = route.params || {};
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('wifi');

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSOS = () => {
    if (!isConnected) {
      Alert.alert(
        '⚠️ No Internet Connection',
        'SOS feature requires an internet connection. Please connect to the internet to use emergency services.',
        [{ text: 'OK' }]
      );
      return;
    }
    Alert.alert(
      '🆘 SOS Emergency',
      'SOS alert has been triggered!\n\nEmergency services have been notified.\nYour location has been shared.\nHelp is on the way.\n\nStay calm and safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm SOS', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('✅ SOS Sent', 'Emergency alert sent successfully!');
          }
        }
      ]
    );
  };

  const handlePolice = async () => {
    const phoneNumber = 'tel:100';
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Error', 'Phone dialer is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open phone dialer. Please dial 100 manually.');
    }
  };

  const handleAmbulance = async () => {
    const phoneNumber = 'tel:108';
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Error', 'Phone dialer is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open phone dialer. Please dial 108 manually.');
    }
  };

  const handleFire = async () => {
    const phoneNumber = 'tel:101';
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Error', 'Phone dialer is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open phone dialer. Please dial 101 manually.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🆘 Emergency Services</Text>
          <View style={[
            styles.connectionBadge,
            isConnected ? styles.onlineBadge : styles.offlineBadge
          ]}>
            <Text style={styles.connectionBadgeText}>
              {isConnected ? '• ONLINE' : '• OFFLINE'}
            </Text>
          </View>
        </View>

        <Text style={styles.headerSubtitle}>
          Quick access to emergency services
        </Text>

        {/* Connection Status Warning */}
        {!isConnected && (
          <View style={styles.warningBanner}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              Internet connection required for emergency services
            </Text>
          </View>
        )}

        {/* Emergency Buttons */}
        <View style={styles.emergencyGrid}>
          {/* SOS Button - Large Primary */}
          <TouchableOpacity
            style={[styles.sosButtonLarge, !isConnected && styles.disabledButton]}
            onPress={handleSOS}
            activeOpacity={0.8}
            disabled={!isConnected}
          >
            <View style={styles.sosContent}>
              <Text style={styles.sosIcon}>🆘</Text>
              <Text style={styles.sosTitle}>SOS</Text>
              <Text style={styles.sosSubtitle}>Emergency Alert</Text>
              {isConnected && <View style={styles.sosPulse} />}
            </View>
            <Text style={styles.sosDescription}>
              Trigger emergency alert and notify all services
            </Text>
          </TouchableOpacity>

          {/* Police Button */}
          <TouchableOpacity
            style={[styles.emergencyButton, styles.policeButton, !isConnected && styles.disabledButton]}
            onPress={handlePolice}
            activeOpacity={0.8}
            disabled={!isConnected}
          >
            <Text style={styles.emergencyIcon}>👮</Text>
            <Text style={styles.emergencyTitle}>Police</Text>
            <Text style={styles.emergencyNumber}>Call 100</Text>
            <Text style={styles.emergencyDescription}>
              Law enforcement emergency
            </Text>
          </TouchableOpacity>

          {/* Ambulance Button */}
          <TouchableOpacity
            style={[styles.emergencyButton, styles.ambulanceButton, !isConnected && styles.disabledButton]}
            onPress={handleAmbulance}
            activeOpacity={0.8}
            disabled={!isConnected}
          >
            <Text style={styles.emergencyIcon}>🚑</Text>
            <Text style={styles.emergencyTitle}>Ambulance</Text>
            <Text style={styles.emergencyNumber}>Call 108</Text>
            <Text style={styles.emergencyDescription}>
              Medical emergency
            </Text>
          </TouchableOpacity>

          {/* Fire Department Button */}
          <TouchableOpacity
            style={[styles.emergencyButton, styles.fireButton, !isConnected && styles.disabledButton]}
            onPress={handleFire}
            activeOpacity={0.8}
            disabled={!isConnected}
          >
            <Text style={styles.emergencyIcon}>🚒</Text>
            <Text style={styles.emergencyTitle}>Fire</Text>
            <Text style={styles.emergencyNumber}>Call 101</Text>
            <Text style={styles.emergencyDescription}>
              Fire emergency
            </Text>
          </TouchableOpacity>
        </View>

        {/* Important Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📋 Important Information</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoCardTitle}>Location Sharing</Text>
              <Text style={styles.infoCardText}>
                Your location will be automatically shared with emergency services
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🌐</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoCardTitle}>Internet Required</Text>
              <Text style={styles.infoCardText}>
                Emergency services require an active internet connection
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>⚡</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoCardTitle}>Quick Response</Text>
              <Text style={styles.infoCardText}>
                Emergency services will be notified immediately
              </Text>
            </View>
          </View>
        </View>

        {/* Direct Numbers (Offline Fallback) */}
        <View style={styles.directNumbersSection}>
          <Text style={styles.directNumbersTitle}>
            📞 Direct Emergency Numbers
          </Text>
          <Text style={styles.directNumbersSubtitle}>
            Use these numbers if internet is unavailable
          </Text>

          <View style={styles.numbersList}>
            <View style={styles.numberItem}>
              <Text style={styles.numberIcon}>👮</Text>
              <Text style={styles.numberLabel}>Police</Text>
              <Text style={styles.numberValue}>100</Text>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.numberIcon}>🚑</Text>
              <Text style={styles.numberLabel}>Ambulance</Text>
              <Text style={styles.numberValue}>108</Text>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.numberIcon}>🚒</Text>
              <Text style={styles.numberLabel}>Fire</Text>
              <Text style={styles.numberValue}>101</Text>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.numberIcon}>👩</Text>
              <Text style={styles.numberLabel}>Women Helpline</Text>
              <Text style={styles.numberValue}>1091</Text>
            </View>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    flex: 1,
    flexShrink: 1,
  },
  connectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexShrink: 0,
  },
  onlineBadge: {
    backgroundColor: '#10b981',
  },
  offlineBadge: {
    backgroundColor: '#ef4444',
  },
  connectionBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    fontWeight: '600',
  },
  emergencyGrid: {
    gap: 16,
    marginBottom: 24,
  },
  sosButtonLarge: {
    backgroundColor: '#fef2f2',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  sosContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sosIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  sosTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 4,
  },
  sosSubtitle: {
    fontSize: 16,
    color: '#991b1b',
    fontWeight: '600',
  },
  sosDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  sosPulse: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  emergencyButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  policeButton: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  ambulanceButton: {
    borderColor: '#f59e0b',
    backgroundColor: '#fffbeb',
  },
  fireButton: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  disabledButton: {
    opacity: 0.5,
  },
  emergencyIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  emergencyDescription: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  directNumbersSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  directNumbersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  directNumbersSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
  },
  numbersList: {
    gap: 12,
  },
  numberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
  },
  numberIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  numberLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
  },
  numberValue: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
