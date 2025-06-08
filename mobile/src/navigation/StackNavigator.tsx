import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { WaitingListScreen } from '../screens/WaitingListScreen';
import { WaitingNumScreen } from '../screens/WaitingList/WaitingNumScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  MainTabs: undefined;
  WaitingListScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  WaitingNumScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="WaitingListScreen" component={WaitingListScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="WaitingNumScreen" component={WaitingNumScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
