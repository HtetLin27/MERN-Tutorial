import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await axios.post("/api/products", {
      ...newProduct,
    });
    console.log(res.data);
    set((state) => ({ products: [...state.products, res.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProdcuts: async () => {
    const res = await axios.get("/api/products");
    console.log(res.data);
    set({ products: res.data.data });
  },
  deleteProduct: async (pid) => {
    const res = await axios.delete(`/api/products/${pid}`);
    console.log(res);
    if (!res.data.success) return { success: false, message: res.data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: res.data.message };
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await axios.put(`/api/products/${pid}`, {
      ...updateProduct,
    });
    console.log(res);
    if (!res.data.success) return { success: false, message: res.data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? res.data.data : product
      ),
    }));

    return { success: true, message: res.data.message };
  },
}));
