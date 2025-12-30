import { BaseAPI } from "../api/base";
import { Brand } from "../services/brandService";
import api from "./axios";

class BrandAPI extends BaseAPI<Brand> {
  constructor() {
    super("categories");
  }

  // Example: Fetch only active brands
  async getActiveBrands(): Promise<Brand[]> {
    const res = await api.get("/brands/active");
    return res.data;
  }

  // Example: Fetch products under a brand
  async getBrandProducts(id: number) {
    const res = await api.get(`/brands/${id}/products`);
    return res.data;
  }
}

export const brandAPI = new BrandAPI();
