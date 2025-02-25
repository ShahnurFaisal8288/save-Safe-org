import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.112/api/',
  // baseURL: 'http://192.168.1.112:8000/api/',
});

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Consider token invalid if decoding fails
  }
};

// Automatic token expiration check
const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  
  if (token && isTokenExpired(token)) {
    // Clear all authentication-related local storage
    const authKeys = [
      'token', 'branch_id', 'collector_number', 
      'id', 'name', 'email', 'permissions', 'sidebar'
    ];
    
    authKeys.forEach(key => localStorage.removeItem(key));
    
    // Redirect to login page
    window.location.href = '/';
  }
};

// Add request interceptor to check token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    checkTokenExpiration();
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Periodic token expiration check (optional)
const startTokenExpirationCheck = () => {
  // Check every 5 minutes
  setInterval(checkTokenExpiration, 5 * 60 * 1000);
};

// Call this when your app initializes
startTokenExpirationCheck();

export default axiosInstance;