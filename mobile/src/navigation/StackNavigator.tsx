import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
// import { HomeScreen } from '../screens/Homescreen';


export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
