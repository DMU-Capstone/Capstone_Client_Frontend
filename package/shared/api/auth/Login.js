import axios from 'axios';


const showAlert = (title, message) => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(`${title}\n${message}`);
  } else {
    const { Alert } = require('react-native');
    Alert.alert(title, message);
  }
};

// ✅ 올바른 로그인 처리 함수
export const handleLogin = async ({ username, password }) => {
  try {
    const response = await axios.post('http://134.185.99.89:8080/login', {
      username,
      password,
    }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Type': 'mobile',
        },
      });

    console.log('응답 상태 코드:', response.status);

    if (response.status === 200) {
      const { name } = response.data;
      showAlert('로그인 성공', `${name}님`);
    } else {
      showAlert('로그인 실패', `응답 코드: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        showAlert('입력 오류', '입력값을 다시 확인해주세요.');
      } else if (status === 401) {
        showAlert('인증 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        showAlert('오류 발생', '다시 시도해주세요.');
      }
    } else {
      showAlert('서버 연결 실패', '네트워크를 확인해주세요.');
    }
  }
};
