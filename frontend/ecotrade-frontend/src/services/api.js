import axios from 'axios';
import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(
  async (config) => {
    // Obtener la sesión actual de Supabase
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  getUserByEmail: (email) => api.get(`/users/email/${email}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  checkEmailExists: (email) => api.get(`/users/exists/${email}`),
  register: (registerData) => api.post('/users/auth/register', registerData),
  login: (loginData) => api.post('/users/auth/login', loginData),
};

// Product API
export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByUserId: (userId) => api.get(`/products/user/${userId}`),
  createProduct: (userId, productData) => api.post(`/products/user/${userId}`, productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;
