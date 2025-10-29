import api from "../api/axios";

export class BaseAPI<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    const res = await api.get(`/${this.endpoint}`);
    return res.data;
  }

  async getById(id: number): Promise<T> {
    const res = await api.get(`/${this.endpoint}/${id}`);
    return res.data;
  }

  async create(data: Partial<T>): Promise<T> {
    const res = await api.post(`/${this.endpoint}`, data);
    return res.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const res = await api.put(`/${this.endpoint}/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/${this.endpoint}/${id}`);
  }
}