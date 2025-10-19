import axios from "axios";
import { Store, StoreResponse, QueueRegistrationRequest } from "../types/store";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStore = async (): Promise<Store[]> => {
  try {
    const response = await axios.get<Store[]>(`${BASE_URL}/stores`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStoreDetail = async (id: number): Promise<StoreResponse> => {
  try {
    const response = await axios.get<StoreResponse>(`${BASE_URL}/stores/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 대기열 등록 API
export const registerQueue = async (storeId: number): Promise<void> => {
  try {
    // AsyncStorage에서 사용자 정보 가져오기
    const name = await AsyncStorage.getItem("name");
    const phoneNumber = await AsyncStorage.getItem("phoneNumber");

    if (!name || !phoneNumber) {
      throw new Error("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
    }

    // 대기열 등록 요청 데이터 생성
    const request: QueueRegistrationRequest = {
      phoneNumber: phoneNumber,
      name: name,
      count: 1, // 기본값 1명
    };

    console.log("Queue registration request:", {
      storeId,
      request,
      url: `${BASE_URL}/queue/${storeId}`,
    });

    await axios.post(`${BASE_URL}/queue/${storeId}`, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Queue registration error:", error);
    throw error;
  }
};
