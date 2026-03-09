import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

const api = axios.create({
    baseURL: API_BASE_URL
});

export const getProducts = (search = '', page = 1, category = '') =>
    api.get('/products', { params: { search, page, category } });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart', { productId, quantity });
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const clearCart = () => api.delete('/cart');

// Auth
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (name, email, password) => api.post('/users', { name, email, password });
export const getProfile = () => api.get('/users/profile');

// Product Management
export const createProduct = (formData) => api.post('/products', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const errorMessage = error.response.data.message || '';

            // Check if it's a token expiration error
            if (errorMessage.includes('expired') || errorMessage.includes('auth/')) {
                try {
                    // Try to get fresh token from Firebase
                    const { auth } = await import('../firebase');
                    const user = auth.currentUser;
                    if (user) {
                        const token = await user.getIdToken(true);

                        // Update localStorage
                        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                        if (userInfo) {
                            userInfo.token = token;
                            localStorage.setItem('userInfo', JSON.stringify(userInfo));
                        }

                        // Retry the original request
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            }

            // If it's a "Sync Error" (User exists in Firebase but not MongoDB)
            if (errorMessage.includes('Sync Error') || errorMessage.includes('not found in store database')) {
                console.warn('Sync error detected. Clearing user info.');
                localStorage.removeItem('userInfo');
                window.location.href = '/login?message=session_expired';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
