import { BaseAPI } from "../api/base";
import { Color } from "../services/colorService";
import api from "./axios";

class ColorAPI extends BaseAPI<Color> {
  constructor() {
    super("colors");
  }

  // Example: Fetch only active colors
  async getActiveColors(): Promise<Color[]> {
    const res = await api.get("/colors/active");
    return res.data;
  }

  // Example: Fetch products under a color
  async getColorProducts(id: number) {
    const res = await api.get(`/colors/${id}/products`);
    return res.data;
  }
}

export const colorAPI = new ColorAPI();
