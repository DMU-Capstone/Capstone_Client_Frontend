import axios from "axios";
import { BannerResponse } from "../types/banner";
import { BASE_URL } from "@env";

export const getBanner = async (): Promise<BannerResponse> => {
  const response = await axios.get<BannerResponse>(`${BASE_URL}/event/select`);
  return response.data;
};
