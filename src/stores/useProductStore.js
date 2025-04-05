import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),

	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axiosInstance.post("/products/", productData);
			set((state) => ({
				products: [...state.products, res.data],
				loading: false,
			}));
			toast.success("Product created successfully!");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create product");
			set({ loading: false });
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/products/");
			set({ products: response.data, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch products");
			set({ loading: false });
		}
	},

	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get(`/products/category/${category}`);
			set({ products: response.data, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch products");
			set({ loading: false });
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axiosInstance.delete(`/products/${productId}`);
			set((state) => ({
				products: state.products.filter((product) => product._id !== productId),
				loading: false,
			}));
			toast.success("Product deleted successfully!");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete product");
			set({ loading: false });
		}
	},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.patch(`/products/${productId}`);
			set((state) => ({
				products: state.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
			toast.success("Product updated successfully!");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update product");
			set({ loading: false });
		}
	},

	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/products/featured");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			toast.error("Failed to fetch featured products");
			set({ loading: false });
		}
	},
}));
