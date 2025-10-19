import axios from "axios";
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
} from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export const signup = async (request: SignupRequest) => {
  try {
    const response = await axios.post<SignupResponse>(
      "/api/auth/signup",
      request,
      {
        headers: {
          "X-Client-Type": "mobile",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (request: LoginRequest) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/login`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Client-Type": "mobile",
        },
      }
    );

    if (response.status === 200) {
      const { name, phoneNumber } = response.data;
      const authToken = response.headers.authorization;
      let token = null;

      if (authToken && authToken.startsWith("Bearer ")) {
        token = authToken.substring(7);
      }

      // 토큰을 AsyncStorage에 저장
      if (token) {
        await AsyncStorage.setItem("userToken", token);
      }
      if (phoneNumber) {
        await AsyncStorage.setItem("phoneNumber", phoneNumber);
      }
      if (name) {
        await AsyncStorage.setItem("name", name);
      }

      return { name, token, phoneNumber };
    } else {
      throw new Error(`로그인 실패: 응답 코드 ${response.status}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 회원 탈퇴 API
export const withdrawUser = async (name: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/quit/${name}`);
    return response;
  } catch (error) {
    console.error("Withdrawal error:", error);
    throw error;
  }
};

// 로그아웃 처리 (로컬 스토리지 정리)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("phoneNumber");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
