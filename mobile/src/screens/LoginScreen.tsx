import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';

export const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.logo}>
              <Text style={{ fontWeight: 'bold' }}>Wait:</Text>It
            </Text>
            <Text style={styles.tagline}>기다리는 즐거움</Text>
          </View>

          <ActivityIndicator
            style={{ paddingTop: 100 }}
            size="large"
            color="blue"
            animating={true}
          />

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

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>회원가입</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.kakaoButton}>
            <Text style={styles.kakaoText}>카카오 로그인</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
