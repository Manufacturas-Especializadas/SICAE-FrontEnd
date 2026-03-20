import { API_CONFIG } from "../../config/api";
import type { Entry } from "../../types/types";
import { apiClient } from "../client";

class CartsService {
  private entryEndpoint = API_CONFIG.endpoints.Carts.entry;

  async entry(data: Entry): Promise<void> {
    return apiClient.post<void>(this.entryEndpoint, data);
  }
}

export const cartsService = new CartsService();
