const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    Carts: {
      getHistory: "/api/Carts/history",
      report: "/api/Carts/report/",
      availabelMonths: "/api/Carts/available-months",
      entry: "/api/Carts/entry",
      exit: "/api/Carts/exit/",
      update: "/api/Carts/update/",
    },
  },
};
