import axios from "axios";
import { Store, StoreResponse } from "../types/store";
import { BASE_URL } from "@env";

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
