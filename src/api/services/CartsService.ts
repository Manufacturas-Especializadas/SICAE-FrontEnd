import { API_CONFIG } from "../../config/api";
import type { Entry, History } from "../../types/types";
import { apiClient } from "../client";

class CartsService {
  private getHistoryEndpoint = API_CONFIG.endpoints.Carts.getHistory;
  private entryEndpoint = API_CONFIG.endpoints.Carts.entry;

  async getHistory(): Promise<History[]> {
    return apiClient.get<History[]>(this.getHistoryEndpoint);
  }

  async entry(data: Entry): Promise<void> {
    return apiClient.post<void>(this.entryEndpoint, data);
  }
}

export const cartsService = new CartsService();
