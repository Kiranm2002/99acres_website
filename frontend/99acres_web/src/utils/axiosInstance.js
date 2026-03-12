import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

// Request interceptor → attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired token
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    
    const originalRequest = error.config;
    console.log("Interceptor triggered");
  console.log("Status:", error.response?.status);
  console.log("Original Request:", error.config);


    if (error.response?.status === 411 && 
          !originalRequest._retry ) {

      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Calling refresh token API");
        console.log("Refresh token:", refreshToken);

        const res = await axios.post(
          "http://localhost:5000/refresh-token",
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (err) {
        console.log("Refresh token expired");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId")
        // localStorage.clear();
        window.location.href = "/";
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;