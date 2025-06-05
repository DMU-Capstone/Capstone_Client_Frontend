import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { MainScreen } from '../screens/MainScreen';
import { StoplistScreen } from '../screens/StoplistScreen';
import { HostRegisterScreen } from '../screens/HostRegisterScreen';
import { NoticeScreen } from '../screens/NoticeScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  MainScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  StoplistScreen: undefined;
  NoticeScreen: undefined;
  HostRegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="StoplistScreen" component={StoplistScreen} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="HostRegisterScreen" component={HostRegisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
