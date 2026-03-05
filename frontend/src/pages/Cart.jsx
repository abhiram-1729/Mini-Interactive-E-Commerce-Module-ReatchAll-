import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { CartItemSkeleton } from '../components/common/Skeleton';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, loading, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    if (loading) {
        return (
            <div className="container py-8 fade-in">
                <div className="cart-header">
                    <div className="skeleton" style={{ width: '100px', height: '1.2rem', marginBottom: '1rem' }}></div>
                    <div className="skeleton" style={{ width: '200px', height: '2.5rem' }}></div>
                </div>
                <div className="cart-content">
                    <div className="cart-items">
                        <CartItemSkeleton />
                        <CartItemSkeleton />
                        <CartItemSkeleton />
                    </div>
                    <div className="skeleton section-glass" style={{ height: '300px' }}></div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container empty-cart">
                <ShoppingBag size={64} />
                <h2>Your cart is empty</h2>
                <p>Look like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        await clearCart();
        alert('Order placed successfully! Thank you for shopping with us.');
    };

    return (
        <div className="container py-4">
            <div className="cart-header">
                <Link to="/" className="back-link">
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>
                <h1>Shopping Cart</h1>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.productId.image} alt={item.productId.name} />
                            <div className="item-details">
                                <h3>{item.productId.name}</h3>
                                <p className="item-price">Rs.{item.productId.price} each</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="item-total">
                                <p className="total-price">Rs.{item.totalPrice}</p>
                                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Items Total</span>
                        <span>Rs.{cartTotal}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free">Rs.0</span>
                    </div>
                    <div className="summary-row total">
                        <span>Grand Total</span>
                        <span>Rs.{cartTotal}</span>
                    </div>
                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
