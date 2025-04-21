// shared/Signup.ts

import axios from 'axios';

const showAlert = (title: string, message: string) => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(`${title}\n${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

// ✅ 객체 타입 정의
type SignupParams = {
  name: string;
  nickName: string;
  password: string;
  phoneNumber: string;
  gender: string;
};

// ✅ 객체 구조 분해로 인자 받기
export const handleSignup = async ({
  name,
  nickName,
  password,
  phoneNumber,
  gender,
}: SignupParams) => {
  try {
    const response = await axios.post('https://134.185.99.89:8080/join', {
      name,
      nickName,
      password,
      phoneNumber,
      gender: gender === '남' ? 'MALE' : 'FEMALE',
    });

    console.log('응답 상태 코드:', response.status);

    if (response.status === 200 || response.status === 201) {
      const { name } = response.data;
      showAlert('회원가입 성공', `${name}님`);
    } else {
      showAlert('회원가입 실패', `응답 코드: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        showAlert('입력 오류', '입력값을 다시 확인해주세요.');
      } else if (status === 409) {
        showAlert('중복된 아이디', '이미 존재하는 닉네임입니다.');
      } else {
        showAlert('오류 발생', '다시 시도해주세요.');
      }
    } else {
      showAlert('서버 연결 실패', '네트워크를 확인해주세요.');
    }
  }
};
