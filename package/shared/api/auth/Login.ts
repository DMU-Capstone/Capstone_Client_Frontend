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
type Login = {
    phone_number: string;
    password: string;
};

// ✅ 객체 구조 분해로 인자 받기
export const handleSignup = async ({
    phone_number,
    password,
}: Login) => {
    try {
        const response = await axios.post('http://134.185.99.89:8080/login', {
            phone_number,
            password,
        });

        console.log('응답 상태 코드:', response.status);

        if (response.status === 200) {
            const { name } = response.data;
            showAlert('로그인 성공', `${name}님`);
        } else {
            showAlert('회원가입 실패', `응답 코드: ${response.status}`);
        }
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            if (status === 400) {
                showAlert('입력 오류', '입력값을 다시 확인해주세요.');
            } else {
                showAlert('오류 발생', '다시 시도해주세요.');
            }
        } else {
            showAlert('서버 연결 실패', '네트워크를 확인해주세요.');
        }
    }
};
