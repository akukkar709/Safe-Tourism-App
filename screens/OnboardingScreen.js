// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const slides = [
//   {
//     id: '1',
//     title: 'Travel Safely',
//     description: 'Get verified safety information before visiting places',
//     icon: 'shield-check',
//     color: '#4CAF50'
//   },
//   {
//     id: '2',
//     title: 'Emergency Support',
//     description: 'Find nearby help, emergency contacts, and support quickly',
//     icon: 'ambulance',
//     color: '#F44336'
//   },
//   {
//     id: '3',
//     title: 'Smart Guidance',
//     description: 'Get smart travel guidance and stay safe anywhere',
//     icon: 'map-marker-path',
//     color: '#2196F3'
//   },
// ];

// const OnboardingScreen = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const slidesRef = useRef(null);
//   const navigation = useNavigation();

//   const viewableItemsChanged = useRef(({ viewableItems }) => {
//     setCurrentIndex(viewableItems[0]?.index || 0);
//   }).current;

//   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

//   const scrollTo = () => {
//     if (currentIndex < slides.length - 1) {
//       slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       navigation.replace('Login');
//     }
//   };

//   const skipOnboarding = () => {
//     navigation.replace('Login');
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.slide}>
//       <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
//         <MaterialCommunityIcons 
//           name={item.icon} 
//           size={80} 
//           color={item.color} 
//         />
//       </View>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//     </View>
//   );

//   const renderDots = () => {
//     return (
//       <View style={styles.dotsContainer}>
//         {slides.map((_, index) => {
//           const dotPosition = Animated.divide(scrollX, width);
//           const opacity = dotPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [0.3, 1, 0.3],
//             extrapolate: 'clamp',
//           });
//           const dotSize = dotPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [8, 12, 8],
//             extrapolate: 'clamp',
//           });
          
//           return (
//             <Animated.View
//               key={index}
//               style={[
//                 styles.dot,
//                 {
//                   width: dotSize,
//                   height: dotSize,
//                   opacity: opacity,
//                   backgroundColor: index === currentIndex ? '#4A80F5' : '#C4C4C4',
//                 },
//               ]}
//             />
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#0F2027', '#203A43', '#2C5364']}
//         style={styles.gradient}
//       >
//         <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>

//         <Animated.FlatList
//           data={slides}
//           renderItem={renderItem}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: false }
//           )}
//           onViewableItemsChanged={viewableItemsChanged}
//           viewabilityConfig={viewConfig}
//           scrollEventThrottle={32}
//           ref={slidesRef}
//         />

//         {renderDots()}

//         <TouchableOpacity style={styles.button} onPress={scrollTo}>
//           <Text style={styles.buttonText}>
//             {currentIndex === slides.length - 1 ? "Let's Get Started" : 'Next'}
//           </Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gradient: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   slide: {
//     width: width,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   iconContainer: {
//     width: width * 0.4,
//     height: width * 0.4,
//     borderRadius: width * 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//     fontFamily: 'sans-serif-medium',
//   },
//   description: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     textAlign: 'center',
//     paddingHorizontal: 30,
//     lineHeight: 24,
//     fontFamily: 'sans-serif',
//   },
//   button: {
//     backgroundColor: '#4A80F5',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     marginBottom: 40,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   dot: {
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//     backgroundColor: '#4A80F5',
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 10,
//   },
//   skipText: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontSize: 16,
//   },
// });

// export default OnboardingScreen;



// screens/OnboardingScreen.js
import React, { useState, useRef, useEffect } from 'react';
import onboarding1 from '../assets/images/onboarding1.jpg';
import onboarding2 from '../assets/images/onboarding2.jpg';
import onboarding3 from '../assets/images/onboarding3.jpg';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Travel Safely',
    description: 'Get verified safety information before visiting places',
    image:  require('../assets/images/onboarding1.jpg'),// Replace with your image URL
    color: '#4CAF50'
  },
  {
    id: '2',
    title: 'Emergency Support',
    description: 'Find nearby help and emergency contacts quickly',
    image: require('../assets/images/onboarding2.jpg'), // Replace with your image URL
    color: '#F44336'
  },
  {
    id: '3',
    title: 'Smart Guidance',
    description: 'Navigate safely with real-time updates',
    image: require('../assets/images/onboarding3.jpg'), // Replace with your image URL
    color: '#2196F3'
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  // const renderItem = ({ item, index }) => (
  //   <View style={styles.slide}>
  //     <View style={styles.imageContainer}>
  //       <Image 
  //         source={{ uri: item.image }} 
  //         style={styles.image} 
  //         resizeMode="cover" 
  //       />
  //     </View>
  //     <View style={styles.textContainer}>
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.description}>{item.description}</Text>
  //     </View>
  //   </View>
  // );


  const renderItem = ({ item }) => (
  <View style={styles.slide}>
    <View style={styles.imageContainer}>
      <Image 
        source={typeof item.image === 'number' ? item.image : { uri: item.image }} 
        style={styles.image} 
        resizeMode="cover" 
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);



  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor: index === currentIndex ? '#4A80F5' : '#C4C4C4',
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

// Replace your current ScrollView with this:
<Animated.ScrollView
  ref={scrollViewRef}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  onScroll={handleScroll}
  onMomentumScrollEnd={handleScrollEnd}
  scrollEventThrottle={16}
  contentContainerStyle={styles.scrollView}
>
  {slides.map((item) => (
    <View key={item.id} style={{ width }}>
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  ))}
</Animated.ScrollView>



      <View style={styles.footer}>
        {renderDots()}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            if (currentIndex === slides.length - 1) {
              navigation.replace('Login');
            } else {
              scrollViewRef.current?.scrollTo({
                x: (currentIndex + 1) * width,
                animated: true,
              });
              setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#4A80F5',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flexGrow: 1,
  },
  slide: {
    width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#C4C4C4',
  },
  button: {
    backgroundColor: '#4A80F5',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;