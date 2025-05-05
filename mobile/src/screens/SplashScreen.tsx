import React, { useEffect } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';


type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2E63E8" barStyle="light-content" />
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#2E63E8" style={{ marginTop: 20 }} animating={true} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp(50),
    height: hp(20), 
    resizeMode: 'contain',
  },
});
