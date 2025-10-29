import { categoryAPI } from "../api/category";
import { BaseService } from "./baseService";

export interface Category {
  id: number;
  name: string;
  description?: string;
  status?: string;
}

class CategoryService extends BaseService<Category> {
  constructor() {
    super("categories");
  }

  async getActiveCategories() {
    return categoryAPI.getActiveCategories();
  }

  async getCategoryProducts(id: number) {
    return categoryAPI.getCategoryProducts(id);
  }
}

export const categoryService = new CategoryService();
