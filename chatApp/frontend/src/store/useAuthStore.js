import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser : null,
  isCheckingAuth : true,
  isSigningUp : false,
  isLoggingIn : false,
  isUpdatingProfile : false,

  checkAuth : async () => {
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({authUser : response.data});
    } catch (error) {
      set({authUser : false})
    }
    finally{
      set({isCheckingAuth : false})
    }
  }
}))