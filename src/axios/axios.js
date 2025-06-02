import axios from "axios";

// Create the Axios instance
const serviceApi = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend baseURL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
serviceApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("product-management-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serviceApi;
