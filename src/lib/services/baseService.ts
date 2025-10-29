import { BaseAPI } from "../api/base";

export class BaseService<T> {
  protected api: BaseAPI<T>;

  constructor(endpoint: string) {
    this.api = new BaseAPI<T>(endpoint);
  }

  getAll() {
    return this.api.getAll();
  }

  getById(id: number) {
    return this.api.getById(id);
  }

  create(data: Partial<T>) {
    return this.api.create(data);
  }

  update(id: number, data: Partial<T>) {
    return this.api.update(id, data);
  }

  delete(id: number) {
    return this.api.delete(id);
  }
}
