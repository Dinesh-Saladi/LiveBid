import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  logout: async () => {
    set({ user: null });
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`);
      return { success: true, message: "Successfully Logged Out" };
    } catch (error) {
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
      console.log("received data: " + response.data);
      console.log(response.data.user);
      let user = response.data.user;
      console.log(user);

      // Ensure `user` is always a single object
      if (Array.isArray(user) && user.length === 1) {
        user = user[0];
      }

      set({ user });
      console.log("user below");
      console.log(get().user);
      return { success: true, message: response.data.message };
    } catch (error) {
      //   alert(error.response.data.message);
      throw new Error(error.response.data.message);
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
