import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

const api = axios.create({
    baseURL: API_BASE_URL
});

export const getProducts = (search = '', page = 1, category = '') =>
    api.get(`/products?search=${search}&page=${page}&category=${category}`);
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart', { productId, quantity });
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const clearCart = () => api.delete('/cart');

// Auth
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (name, email, password) => api.post('/users', { name, email, password });
export const getProfile = () => api.get('/users/profile');

// Add token to requests
api.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

export default api;
