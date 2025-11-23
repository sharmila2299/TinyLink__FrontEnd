import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "",
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || error.message);
  }
);

export default httpClient;
