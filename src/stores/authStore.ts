import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout as logoutAPI } from "../apis/auth";
import { LoginResponse } from "../types/auth";

interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (username: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await login({ username, password });

      if (response && response.token) {
        set({
          user: response,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutAPI();
      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("userToken");
      const name = await AsyncStorage.getItem("name");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");

      if (token && name && phoneNumber) {
        set({
          user: { name, phoneNumber, token },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Check auth error:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
