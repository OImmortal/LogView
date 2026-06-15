import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export const TENANT_CNPJ =
  process.env.REACT_APP_TENANT_CNPJ || "12345678000199";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  config.headers["X-Tenant-Cnpj"] = TENANT_CNPJ;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default apiClient;
