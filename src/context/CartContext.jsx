import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useAuth();

    const fetchCart = async () => {
        if (!userInfo) {
            setCartItems([]);
            setLoading(false);
            return;
        }
        try {
            const { data } = await api.getCart();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            if (error.response?.status === 401) {
                setCartItems([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!userInfo) {
            alert('Please login to add items to cart');
            return;
        }
        try {
            await api.addToCart(productId, quantity);
            fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await api.removeFromCart(id);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            // Find existing quantity to calculate the diff for the API
            const existingItem = cartItems.find(item => item.productId._id === productId);
            const diff = quantity - (existingItem ? existingItem.quantity : 0);
            if (diff === 0) return;

            await api.addToCart(productId, diff);
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userInfo]);

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.totalPrice), 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            cartCount,
            refreshCart: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
