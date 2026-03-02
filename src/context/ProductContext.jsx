import React, { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../api';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('');

    const fetchProducts = useCallback(async (searchTerm = '', currentPage = 1, currentCategory = '') => {
        setLoading(true);
        try {
            const { data } = await api.getProducts(searchTerm, currentPage, currentCategory);
            setProducts(data.products);
            setPage(data.page);
            setPages(data.pages);
            setCount(data.count);
            setError(null);
        } catch (err) {
            setError(err.message || 'Error fetching products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        products,
        loading,
        error,
        page,
        pages,
        count,
        category,
        setPage,
        setCategory,
        fetchProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
