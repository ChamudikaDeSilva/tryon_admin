import { BaseAPI } from "../api/base";
import { Category } from "../services/categoryService";
import api from "./axios";

class CategoryAPI extends BaseAPI<Category> {
  constructor() {
    super("categories");
  }

  // Example: Fetch only active categories
  async getActiveCategories(): Promise<Category[]> {
    const res = await api.get("/categories/active");
    return res.data;
  }

  // Example: Fetch products under a category
  async getCategoryProducts(id: number) {
    const res = await api.get(`/categories/${id}/products`);
    return res.data;
  }
}

export const categoryAPI = new CategoryAPI();
