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
}));
