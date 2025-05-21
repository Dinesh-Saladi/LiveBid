import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    set({ user: null });
    try{
        const response = await axios.post(`${BASE_URL}/auth/logout`);
        return { success: true, message: "Successfully Logged Out" };
    }catch (error) {
        //   alert(error.response.data.message);
        throw new Error("Unable to Logout. Please try again later");
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      set({ user: response.data.user });
      return { success: true, message: response.data.message };
    } catch (error) {
      //   alert(error.response.data.message);
      throw new Error(response.data.message);
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      console.log(response.data.message);
      return { success: true, message: response.data.message };
    } catch (error) {
      //   return { success: false, message: error.response.data.message };
      throw new Error(error.response.data.message);
    }
  },
}));
