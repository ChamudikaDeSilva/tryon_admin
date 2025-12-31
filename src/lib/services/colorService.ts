import { colorAPI } from "../api/color";
import { BaseService } from "./baseService";

export interface Color {
  id: number;
  name: string;
  color_code?: string;
  is_active?: boolean;
}

class ColorService extends BaseService<Color> {
  constructor() {
    super("colors");
  }
  

  async getActiveColors() {
    return colorAPI.getActiveColors();
  }

  async getColorProducts(id: number) {
    return colorAPI.getColorProducts(id);
  }
}

export const colorService = new ColorService();
