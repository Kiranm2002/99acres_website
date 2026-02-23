import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // replace with your backend
  withCredentials: true, // allow cookies for refresh token
});

export default api;