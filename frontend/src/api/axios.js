import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // For FormData, don't set Content-Type - let browser/axios handle it
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  console.log("📤 Request config:", {
    method: config.method,
    url: config.url,
    hasData: !!config.data,
    isFormData: config.data instanceof FormData,
    headers: config.headers,
  });

  return config;
});

export default api;
