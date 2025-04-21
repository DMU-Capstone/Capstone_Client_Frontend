import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import axios from 'axios';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import { handleSignup } from '@shared/api/auth/Signup';

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [authRequested, setAuthRequested] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const handleSendAuthCode = () => {
    // 서버 요청 로직 추가 필요
    console.log(`인증번호 발급 요청: ${phoneNumber}`);
    setAuthRequested(true);
  };

  const handleGenderSelect = (value: string) => {
    setGender(value);
  };

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, ''); // 숫자만 추출
    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://134.185.99.89:8080/join', {
        name,
        nickName,
        password,
        phoneNumber,
        gender: gender === '남' ? 'MALE' : 'FEMALE',
      });
  
      console.log('응답 상태 코드:', response.status);
      
      if (response.status === 201) {
        const {name} = response.data;
        console.log("응답 상태 코드:", response.status);
        navigation.replace('Login')
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          Alert.alert('입력 오류', '입력값을 다시 확인해주세요.');
        } else if (status === 409) {
          Alert.alert('중복된 아이디', '이미 존재하는 닉네임입니다.');
        } else {
          Alert.alert('오류 발생', '다시 시도해주세요.');
        }
      } else {
        Alert.alert('서버 연결 실패', '네트워크를 확인해주세요.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>입력한 정보가 맞다면{'\n'}아래 확인 버튼을 눌러주세요.</Text>

      {/* 휴대폰 번호 + 인증번호 발급 버튼 */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <InputField
            label="휴대폰 번호"
            placeholder="010-1111-1111"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.authButton} onPress={handleSendAuthCode}>
          <Text style={styles.authButtonText}>인증번호 발급</Text>
        </TouchableOpacity>
      </View>

      {authRequested && (
        <InputField
          label="인증번호"
          placeholder="123456"
          value={authCode}
          onChangeText={setAuthCode}
          keyboardType="phone-pad"
        />
      )}  

      <InputField
        label="비밀번호"
        placeholder="비밀번호 4~10자 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        label="이름"
        placeholder="홍길동"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        value={nickName}
        onChangeText={setNickName}
      />

      <Text style={styles.genderLabel}>성별</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === '남' && styles.genderSelected,
          ]}
          onPress={() => handleGenderSelect('남')}
        >
          <Text style={gender === '남' ? styles.genderTextSelected : styles.genderText}>남</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === '여' && styles.genderSelected,
          ]}
          onPress={() => handleGenderSelect('여')}
        >
          <Text style={gender === '여' ? styles.genderTextSelected : styles.genderText}>여</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <Button title="확인" color="#4B6EF6" onPress={handleSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButton: {
    marginLeft: 10,
    backgroundColor: '#4B6EF6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    
    justifyContent: 'center',
  },
  authButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },

  genderLabel: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold'
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#4B6EF6',
    borderColor: '#4B6EF6',
  },
  genderText: {
    color: '#333',
  },
  genderTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
