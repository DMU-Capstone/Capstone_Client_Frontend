import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/authStore";

import SplashScreen from "../screens/SplashScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { StorDetailScreen } from "../screens/StoreDetailScreen";
import { WaitingNumScreen } from "../screens/WaitingList/WaitingNumScreen";
import { AlramScreen } from "../screens/AlramScreen";

export type RootStackParamList = {
  SplashScreen: undefined;
  MainTabs: undefined;
  StorDetailScreen: { hostId: number };
  LoginScreen: undefined;
  SignupScreen: undefined;
  WaitingNumScreen: undefined;
  AlramScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <BottomTabNavigator />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "MainTabs" : "SplashScreen"}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="StorDetailScreen" component={StorDetailScreen} />
      <Stack.Screen name="WaitingNumScreen" component={WaitingNumScreen} />
      <Stack.Screen name="AlramScreen" component={AlramScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
