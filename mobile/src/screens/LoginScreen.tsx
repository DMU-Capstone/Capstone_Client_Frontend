import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import * as WebBrowser from 'expo-web-browser';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;


export const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const KAKAO_AUTH_URL =
    'https://kauth.kakao.com/oauth/authorize' +
    '?client_id=YOUR_REST_API_KEY' +
    '&redirect_uri=https://example.com/oauth' +
    '&response_type=code';

  const handleKakaoLogin = async () => {
    await WebBrowser.openBrowserAsync(KAKAO_AUTH_URL);
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://134.185.99.89:8080/login',
        {
          phone_number: phone,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Type': 'mobile',
          },
        }
      );

      console.log('로그인 성공:', response.data);

      // 토큰 저장하거나 다음 화면으로 이동
      // 예: navigation.navigate('HomeScreen');
    } catch (error: any) {
      if (error.response) {
        console.log('로그인 실패:', error.response.data);
        alert('로그인 실패: ' + error.response.status);
      } else {
        console.error('에러:', error.message);
      }
    }
  };


  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>
          <Text style={{ fontWeight: 'bold' }}>Wait:</Text>It
        </Text>
        <Text style={styles.tagline}>기다리는 즐거움</Text>
      </View>

      <TextInput
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.signupButton}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin} >
        <Text style={styles.kakaoText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 28, marginBottom: 4 },
  tagline: { fontSize: 12, color: '#333', marginBottom: 30 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#3B66F6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: { color: '#fff', fontWeight: 'bold' },
  signupButton: {
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: { color: '#3B66F6' },
  kakaoButton: {
    backgroundColor: '#FEE500',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  kakaoText: { color: '#000', fontWeight: 'bold' },
});
