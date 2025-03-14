import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    sign: false,
    emailName: null,
    checkingAuth: true,
    resendLoading: false,
    verified:false,
    setVerified: (verified) => set({ verified }),
    setSign: (sign) => set({ sign }),
    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });
        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }
        try {
            set({ emailName: email });
            const res = await axiosInstance.post("/auth/register", { name, email, password });
            set({ loading: false });
            toast.success(res.data.message);
            set({ sign: true });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    verifyOtp: async ({ otp }) => {
        set({ loading: true });
        const { emailName } = get();
        try {
            const res = await axiosInstance.post("/auth/verifyOtp", { otp, email: emailName });
            set({ emailName: null });
            set({ loading: false });
            set({verified:true});
            toast.success(res.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    resendOtp: async () => {
        set({ resendLoading: true });
        const { emailName } = get();
        try {
            const res = await axiosInstance.post("/auth/resendOtp", { email: emailName });
            set({ resendLoading: false });
            toast.success(res.data.message);
        } catch (error) {
            set({ resendLoading: false });
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
}));
