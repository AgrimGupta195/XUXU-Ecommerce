import { create } from "zustand";
import axiosInstance from "../lib/axios";
import {toast} from "react-hot-toast";

export const useUserStore = create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    signup:async({name,email,password,confirmPassword})=>{
            set({loading:true});
            console.log(name,email,password,confirmPassword);
            
            if(password !== confirmPassword){
                set({loading:false});
                return toast.error("Passwords do not match");
            }
            try {
                const res = await axiosInstance.post("/auth/register",{name,email,password});
                set({loading:false});
                toast.success(res.data.message);
            }
        catch (error) {
            set({loading:false});
            toast.error(error.response.data.message);
        }
    },
    verifyOtp: async (otp) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/verifyOtp", { otp });
            set({ loading: false });
            toast.success(res.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },
    resendOtp: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/resendOtp");
            set({ loading: false });
            toast.success(res.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },
    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            set({ loading: false, user: res.data.user });
            toast.success(res.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({ loading: false, user: null });
            toast.success(res.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },
}))