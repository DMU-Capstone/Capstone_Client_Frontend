import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { StoplistScreen } from '../screens/StoplistScreen';
import { NoticeScreen } from '../screens/NoticeScreen';
import { HostRegisterScreen } from '../screens/HostRegisterScreen';
// import { Text, View } from 'react-native';

export type TabParamList = {
  Home: undefined;
  Stoplist: undefined;
  Notice: undefined;
  HostRegister: undefined;
};

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Stoplist" component={StoplistScreen} />
    <Tab.Screen name="Notice" component={NoticeScreen} />
    <Tab.Screen name="HostRegister" component={HostRegisterScreen} />
  </Tab.Navigator>
); 