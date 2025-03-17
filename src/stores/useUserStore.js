import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
import axios from "axios";
export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    sign: false,

    emailName: null,
    checkingAuth: true,
    resendLoading: false,
    verified: false,
    setVerified: (verified) => set({ verified }),
    setSign: (sign) => set({ sign }),
    setemailName:(emailName) => set({ emailName }),
    
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
            set({ verified: true }); // Mark user as verified
            set({ user: res.data });
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
            const res = await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
            set({ loading: false, user: res.data });
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

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axiosInstance.get("/auth/getProfile");
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    },
}));


let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);