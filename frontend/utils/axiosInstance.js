import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment-xv8h.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
