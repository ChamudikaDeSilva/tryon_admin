import { brandAPI} from "../api/brand";
import { BaseService } from "./baseService";

export interface Brand {
  id: number;
  name: string;
  description?: string;
  is_active?: boolean;
}

class BrandService extends BaseService<Brand> {
  constructor() {
    super("brands");
  }
  

  async getActiveBrands() {
    return brandAPI.getActiveBrands();
  }

  async getBrandProducts(id: number) {
    return brandAPI.getBrandProducts(id);
  }
}

export const brandService = new BrandService();
