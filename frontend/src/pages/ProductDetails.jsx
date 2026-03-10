import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Loader2, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import { ProductDetailsSkeleton } from '../components/common/Skeleton';
import * as api from '../api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        setAdding(true);
        try {
            await addToCart(product._id);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return <ProductDetailsSkeleton />;
    }

    if (!product) {
        return (
            <div className="container py-8 text-center">
                <h2>Product not found</h2>
                <Link to="/" className="btn btn-primary mt-4">Back to Store</Link>
            </div>
        );
    }

    return (
        <div className="container py-8 fade-in">
            <Link to="/" className="back-link mb-8 inline-flex items-center gap-2 text-muted hover:text-primary transition-colors">
                <ArrowLeft size={18} />
                <span>Back to Collection</span>
            </Link>

            <div className="product-details-grid">
                <div className="product-viewer">
                    <div className="product-image-container section-glass">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="main-product-image"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60';
                            }}
                        />
                        <span className="premium-badge">Premium Collection</span>
                    </div>
                </div>

                <div className="product-content">
                    <div className="product-header-info">
                        <div className="category-row">
                            <span className="category-text gold-text">{product.category}</span>
                            <div className="product-actions">
                                <button className="action-circle" title="Add to Wishlist"><Star size={18} /></button>
                                <button className="action-circle" title="Share"><ShoppingCart size={18} /></button>
                            </div>
                        </div>
                        <h1 className="product-title-large">{product.name}</h1>
                        <div className="rating-row">
                            <div className="stars-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < 4 ? "var(--primary-color)" : "none"} stroke="var(--primary-color)" />
                                ))}
                            </div>
                            <span className="review-count">4.8 (124 reviews)</span>
                        </div>
                        <div className="price-tag-large gold-text">Rs.{product.price}</div>
                    </div>

                    <div className="product-description-section">
                        <h3>Product Insight</h3>
                        <p className="description-long">{product.description}</p>
                    </div>

                    <div className="product-utility-grid">
                        <div className="utility-item">
                            <ShieldCheck size={22} className="gold-text" />
                            <div>
                                <h4>Security</h4>
                                <p>Verified Quality</p>
                            </div>
                        </div>
                        <div className="utility-item">
                            <Truck size={22} className="gold-text" />
                            <div>
                                <h4>Delivery</h4>
                                <p>Luxury Shipping</p>
                            </div>
                        </div>
                    </div>

                    <div className="selection-actions">
                        <div className="purchase-row">
                            <button
                                className={`add-to-cart-premium ${added ? 'added' : ''}`}
                                onClick={handleAddToCart}
                                disabled={product.stock === 0 || adding || added}
                            >
                                {adding ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : added ? (
                                    <Check size={24} />
                                ) : (
                                    <ShoppingCart size={24} />
                                )}
                                <span>{adding ? 'Adding...' : added ? 'In Your Cart' : 'Reserve Now'}</span>
                            </button>
                        </div>

                        <div className="stock-alert">
                            <div className={`stock-status-pill ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                <span className="status-indicator"></span>
                                {product.stock > 0 ? `Availability: ${product.stock} Exclusive Units` : 'Temporarily Unavailable'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
