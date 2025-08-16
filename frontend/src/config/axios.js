// import axios from 'axios';


// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         "Authorization": `Bearer ${localStorage.getItem('token')}`
//     }
// })


// export default axiosInstance;   



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add Authorization header dynamically if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;