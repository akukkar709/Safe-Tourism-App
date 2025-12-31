import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen({ navigation, route }) {
  const { email, name } = route.params || {};
  const [menuVisible, setMenuVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('wifi');

  const features = [
    {
      id: 1,
      icon: '👤',
      title: 'My Profile',
      description: 'View and manage your profile',
      onPress: () => navigation.navigate('UserProfile', { email }),
    },
    {
      id: 2,
      icon: '📊',
      title: 'Dashboard',
      description: 'View your statistics and activity',
      onPress: () => alert('Dashboard coming soon!'),
    },
    {
      id: 3,
      icon: '⚙️',
      title: 'Settings',
      description: 'Manage app preferences',
      onPress: () => navigation.navigate('Settings', { email, name }),
    },
    {
      id: 4,
      icon: '📱',
      title: 'Services',
      description: 'Explore available services',
      onPress: () => alert('Services coming soon!'),
    },
    {
      id: 5,
      icon: '💳',
      title: 'Payments',
      description: 'Manage your transactions',
      onPress: () => alert('Payments coming soon!'),
    },
    {
      id: 6,
      icon: '📞',
      title: 'Support',
      description: 'Get help and support',
      onPress: () => alert('Support coming soon!'),
    },
  ];

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleInternetStatus = () => {
    if (isConnected) {
      Alert.alert(
        '🌐 Internet Connected',
        `You are online via ${connectionType.toUpperCase()}\n\nConnection Type: ${connectionType}\nStatus: Connected`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        '📵 No Internet Connection',
        'You are currently offline. Some features may not be available.\n\nPlease check your internet connection.',
        [{ text: 'OK' }]
      );
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMenuVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.menuScroll}>
              {features.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    feature.onPress();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemIcon}>{feature.icon}</Text>
                  <View style={styles.menuItemTextContainer}>
                    <Text style={styles.menuItemTitle}>{feature.title}</Text>
                    <Text style={styles.menuItemDescription}>
                      {feature.description}
                    </Text>
                  </View>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}

              {/* Quick Actions in Menu */}
              <View style={styles.menuDivider} />
              <Text style={styles.menuSectionTitle}>Quick Actions</Text>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('UserProfile', { email });
                }}
              >
                <Text style={styles.menuItemIcon}>👤</Text>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>View Profile</Text>
                  <Text style={styles.menuItemDescription}>Check your account</Text>
                </View>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  alert('Notifications coming soon!');
                }}
              >
                <Text style={styles.menuItemIcon}>🔔</Text>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>Notifications</Text>
                  <Text style={styles.menuItemDescription}>View your alerts</Text>
                </View>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  alert('Activity coming soon!');
                }}
              >
                <Text style={styles.menuItemIcon}>📈</Text>
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>Activity</Text>
                  <Text style={styles.menuItemDescription}>Track your usage</Text>
                </View>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          {/* Hamburger Menu Icon */}
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </TouchableOpacity>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{name || 'User'}! 👋</Text>
          </View>
          
          <TouchableOpacity
            style={styles.profileIconButton}
            onPress={() => navigation.navigate('UserProfile', { email })}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔒</Text>
            <Text style={styles.statValue}>Secure</Text>
            <Text style={styles.statLabel}>Account</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>Active</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        {/* Internet Connectivity Status */}
        <View style={styles.connectivitySection}>
          <Text style={styles.connectivityTitle}>Connection Status</Text>
          
          <TouchableOpacity
            style={[
              styles.connectivityCard,
              isConnected ? styles.connectivityCardOnline : styles.connectivityCardOffline
            ]}
            onPress={handleInternetStatus}
            activeOpacity={0.8}
          >
            <View style={styles.connectivityIconContainer}>
              <Text style={styles.connectivityIcon}>
                {isConnected ? '🌐' : '📵'}
              </Text>
              <View
                style={[
                  styles.statusIndicator,
                  isConnected ? styles.statusIndicatorOnline : styles.statusIndicatorOffline
                ]}
              />
            </View>
            
            <View style={styles.connectivityInfo}>
              <Text style={[
                styles.connectivityStatus,
                isConnected ? styles.connectivityStatusOnline : styles.connectivityStatusOffline
              ]}>
                {isConnected ? 'Online' : 'Offline'}
              </Text>
              <Text style={styles.connectivityDescription}>
                {isConnected 
                  ? `Connected via ${connectionType.toUpperCase()}`
                  : 'No internet connection'}
              </Text>
            </View>

            <View style={[
              styles.connectivityBadge,
              isConnected ? styles.connectivityBadgeOnline : styles.connectivityBadgeOffline
            ]}>
              <Text style={styles.connectivityBadgeText}>
                {isConnected ? '✓' : '✕'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Feature Availability */}
          <View style={styles.featureAvailability}>
            <Text style={styles.featureAvailabilityTitle}>
              {isConnected ? 'All Features Available' : 'Limited Features'}
            </Text>
            
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureItemIcon}>
                  {isConnected ? '✅' : '⚠️'}
                </Text>
                <Text style={styles.featureItemText}>
                  {isConnected ? 'Real-time sync enabled' : 'Offline mode active'}
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureItemIcon}>
                  {isConnected ? '✅' : '⚠️'}
                </Text>
                <Text style={styles.featureItemText}>
                  {isConnected ? 'Cloud backup active' : 'Local storage only'}
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureItemIcon}>
                  {isConnected ? '✅' : '❌'}
                </Text>
                <Text style={styles.featureItemText}>
                  {isConnected ? 'Online services available' : 'Online services unavailable'}
                </Text>
              </View>
            </View>
          </View>

          {/* Tap to View Details */}
          <Text style={styles.tapHint}>
            Tap the connection card for more details
          </Text>
        </View>

        {/* Emergency Services Button */}
        <TouchableOpacity
          style={styles.emergencyServicesButton}
          onPress={() => navigation.navigate('EmergencyServices', { email, name })}
          activeOpacity={0.8}
        >
          <View style={styles.emergencyButtonHeader}>
            <Text style={styles.emergencyServicesIcon}>🆘</Text>
            <View style={[
              styles.emergencyStatusBadge,
              isConnected ? styles.emergencyOnline : styles.emergencyOffline
            ]}>
              <Text style={styles.emergencyStatusText}>
                {isConnected ? '• ONLINE' : '• OFFLINE'}
              </Text>
            </View>
          </View>
          <Text style={styles.emergencyServicesTitle}>Emergency Services</Text>
          <Text style={styles.emergencyServicesSubtitle}>
            SOS, Police, Ambulance & more
          </Text>
          <View style={styles.emergencyServicesFooter}>
            <Text style={styles.emergencyServicesFooterText}>Tap to access ›</Text>
          </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  hamburgerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#ffffff',
    marginVertical: 2,
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  menuScroll: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuItemIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuItemArrow: {
    fontSize: 28,
    color: '#6b7280',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profileIcon: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionArrow: {
    fontSize: 32,
    color: '#6b7280',
  },
  connectivitySection: {
    marginTop: 24,
    marginBottom: 20,
  },
  connectivityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  connectivityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    elevation: 4,
    borderWidth: 2,
  },
  connectivityCardOnline: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  connectivityCardOffline: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  connectivityIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  connectivityIcon: {
    fontSize: 48,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  statusIndicatorOnline: {
    backgroundColor: '#10b981',
  },
  statusIndicatorOffline: {
    backgroundColor: '#ef4444',
  },
  connectivityInfo: {
    flex: 1,
  },
  connectivityStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  connectivityStatusOnline: {
    color: '#059669',
  },
  connectivityStatusOffline: {
    color: '#dc2626',
  },
  connectivityDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  connectivityBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectivityBadgeOnline: {
    backgroundColor: '#10b981',
  },
  connectivityBadgeOffline: {
    backgroundColor: '#ef4444',
  },
  connectivityBadgeText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  featureAvailability: {
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
  featureAvailabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  featureItemIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  featureItemText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  tapHint: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emergencyServicesButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    marginBottom: 20,
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
  },
  emergencyButtonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyServicesIcon: {
    fontSize: 56,
  },
  emergencyStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  emergencyOnline: {
    backgroundColor: '#10b981',
  },
  emergencyOffline: {
    backgroundColor: '#ef4444',
  },
  emergencyStatusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emergencyServicesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  emergencyServicesSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
  },
  emergencyServicesFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
  },
  emergencyServicesFooterText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    textAlign: 'center',
  },
});
