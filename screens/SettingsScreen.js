import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen({ navigation, route }) {
  const { email, name } = route.params || {};
  
  // State for settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleThemeToggle = (value) => {
    setIsDarkMode(value);
    Alert.alert(
      value ? '🌙 Dark Mode' : '☀️ Light Mode',
      `${value ? 'Dark' : 'Light'} theme ${value ? 'enabled' : 'disabled'}!`,
      [{ text: 'OK' }]
    );
  };

  const handleBluetoothToggle = (value) => {
    setIsBluetoothEnabled(value);
    Alert.alert(
      value ? 'Bluetooth Enabled' : 'Bluetooth Disabled',
      `Bluetooth has been ${value ? 'turned on' : 'turned off'}.`,
      [{ text: 'OK' }]
    );
  };

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
  };

  const handleLocationToggle = (value) => {
    setLocationEnabled(value);
  };

  const backgroundColor = isDarkMode ? '#1f2937' : '#f9fafb';
  const cardBackground = isDarkMode ? '#374151' : '#ffffff';
  const textColor = isDarkMode ? '#f9fafb' : '#1f2937';
  const subtextColor = isDarkMode ? '#d1d5db' : '#6b7280';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
          <Text style={[styles.headerSubtitle, { color: subtextColor }]}>
            Manage your preferences
          </Text>
        </View>

        {/* Theme Section */}
        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            🎨 Appearance
          </Text>

          {/* Dark/Light Theme Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingIcon, { fontSize: 32 }]}>
                {isDarkMode ? '🌙' : '☀️'}
              </Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: textColor }]}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={[styles.settingDescription, { color: subtextColor }]}>
                  {isDarkMode
                    ? 'Dark theme is active'
                    : 'Light theme is active'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              thumbColor={isDarkMode ? '#ffffff' : '#f3f4f6'}
            />
          </View>
        </View>

        {/* Connectivity Section */}
        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            📡 Connectivity
          </Text>

          {/* Bluetooth Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingIcon, { fontSize: 32 }]}>
                {isBluetoothEnabled ? '📶' : '📵'}
              </Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: textColor }]}>
                  Bluetooth
                </Text>
                <Text style={[styles.settingDescription, { color: subtextColor }]}>
                  {isBluetoothEnabled
                    ? 'Bluetooth is enabled'
                    : 'Bluetooth is disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={isBluetoothEnabled}
              onValueChange={handleBluetoothToggle}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={isBluetoothEnabled ? '#ffffff' : '#f3f4f6'}
            />
          </View>

          {/* Location Toggle */}
          <View style={[styles.settingItem, styles.settingItemBorder]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingIcon, { fontSize: 32 }]}>📍</Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: textColor }]}>
                  Location Services
                </Text>
                <Text style={[styles.settingDescription, { color: subtextColor }]}>
                  {locationEnabled ? 'Location is enabled' : 'Location is disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={locationEnabled ? '#ffffff' : '#f3f4f6'}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            🔔 Notifications
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingIcon, { fontSize: 32 }]}>
                {notificationsEnabled ? '🔔' : '🔕'}
              </Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: textColor }]}>
                  Push Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: subtextColor }]}>
                  {notificationsEnabled
                    ? 'Receive notifications'
                    : 'Notifications disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: '#d1d5db', true: '#f59e0b' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f3f4f6'}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            👤 Account
          </Text>

          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate('UserProfile', { email })}
          >
            <Text style={styles.settingButtonIcon}>👤</Text>
            <View style={styles.settingButtonTextContainer}>
              <Text style={[styles.settingButtonTitle, { color: textColor }]}>
                My Profile
              </Text>
              <Text style={[styles.settingButtonSubtitle, { color: subtextColor }]}>
                View and edit your profile
              </Text>
            </View>
            <Text style={[styles.settingButtonArrow, { color: subtextColor }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, styles.settingButtonBorder]}
            onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
          >
            <Text style={styles.settingButtonIcon}>🔒</Text>
            <View style={styles.settingButtonTextContainer}>
              <Text style={[styles.settingButtonTitle, { color: textColor }]}>
                Privacy & Security
              </Text>
              <Text style={[styles.settingButtonSubtitle, { color: subtextColor }]}>
                Manage your privacy settings
              </Text>
            </View>
            <Text style={[styles.settingButtonArrow, { color: subtextColor }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, styles.settingButtonBorder]}
            onPress={() => Alert.alert('Password', 'Change password coming soon!')}
          >
            <Text style={styles.settingButtonIcon}>🔑</Text>
            <View style={styles.settingButtonTextContainer}>
              <Text style={[styles.settingButtonTitle, { color: textColor }]}>
                Change Password
              </Text>
              <Text style={[styles.settingButtonSubtitle, { color: subtextColor }]}>
                Update your password
              </Text>
            </View>
            <Text style={[styles.settingButtonArrow, { color: subtextColor }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            ℹ️ About
          </Text>

          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => Alert.alert('Version', 'App Version 1.0.0')}
          >
            <Text style={styles.settingButtonIcon}>📱</Text>
            <View style={styles.settingButtonTextContainer}>
              <Text style={[styles.settingButtonTitle, { color: textColor }]}>
                App Version
              </Text>
              <Text style={[styles.settingButtonSubtitle, { color: subtextColor }]}>
                1.0.0
              </Text>
            </View>
            <Text style={[styles.settingButtonArrow, { color: subtextColor }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, styles.settingButtonBorder]}
            onPress={() => Alert.alert('Help', 'Help & Support coming soon!')}
          >
            <Text style={styles.settingButtonIcon}>❓</Text>
            <View style={styles.settingButtonTextContainer}>
              <Text style={[styles.settingButtonTitle, { color: textColor }]}>
                Help & Support
              </Text>
              <Text style={[styles.settingButtonSubtitle, { color: subtextColor }]}>
                Get help with the app
              </Text>
            </View>
            <Text style={[styles.settingButtonArrow, { color: subtextColor }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home', { email, name })}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>🏠 Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 12,
    paddingTop: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingButtonBorder: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 12,
    paddingTop: 16,
  },
  settingButtonIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  settingButtonTextContainer: {
    flex: 1,
  },
  settingButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingButtonSubtitle: {
    fontSize: 12,
  },
  settingButtonArrow: {
    fontSize: 28,
  },
  backButton: {
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
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
