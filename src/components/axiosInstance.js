import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
  });
  // Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is expired or invalid, log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('branch_id');
        localStorage.removeItem('collector_number');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('permissions');
        localStorage.removeItem('sidebar');
        window.location.href = '/login'; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );
export default axiosInstance
