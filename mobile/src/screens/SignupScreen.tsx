import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import InputField from '../components/InputField';

export const SignupScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>입력한 정보가 맞다면{'\n'}아래 확인 버튼을 눌러주세요.</Text>

      <InputField label="휴대폰 번호" placeholder="010-1111-1111" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField label="비밀번호" placeholder="비밀번호 4~10자 입력" value={password} onChangeText={setPassword} secureTextEntry />
      <InputField label="이름" placeholder="홍길동" value={name} onChangeText={setName} />
      <InputField label="닉네임" placeholder="닉네임을 입력해주세요" value={nickname} onChangeText={setNickname} />
      <InputField label="성별" placeholder="남 / 여" value={gender} onChangeText={setGender} />

      <View style={styles.button}>
        <Button title="확인" color="#4B6EF6" onPress={() => console.log('확인 버튼 클릭')} />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
