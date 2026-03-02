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
            <Link to="/" className="back-link mb-6 inline-flex items-center gap-2 text-muted hover:text-primary transition-colors">
                <ArrowLeft size={20} />
                Back to Store
            </Link>

            <div className="product-details-grid">
                <div className="product-image-large section-glass">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60';
                        }}
                    />
                    <span className="category-badge">{product.category}</span>
                </div>

                <div className="product-info-details section-glass">
                    <div className="info-header">
                        <h1>{product.name}</h1>
                        <div className="rating-container">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < 4 ? "var(--secondary-color)" : "none"} stroke={i < 4 ? "var(--secondary-color)" : "var(--text-muted)"} />
                                ))}
                            </div>
                            <span className="reviews">(48 Reviews)</span>
                        </div>
                        <p className="price-large">Rs.{product.price}</p>
                    </div>

                    <div className="info-body">
                        <h3>Description</h3>
                        <p className="description-text">{product.description}</p>

                        <div className="product-specs">
                            <div className="spec-item">
                                <ShieldCheck size={20} />
                                <span>1 Year Warranty</span>
                            </div>
                            <div className="spec-item">
                                <Truck size={20} />
                                <span>Free Shipping</span>
                            </div>
                        </div>

                        <div className="stock-info">
                            <span className={`status-dot ${product.stock > 0 ? 'online' : 'offline'}`}></span>
                            {product.stock > 0 ? (
                                <span className="stock-status">In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="stock-status out">Out of Stock</span>
                            )}
                        </div>
                    </div>

                    <div className="info-footer">
                        <button
                            className={`add-to-cart-large ${added ? 'success' : ''}`}
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
                            {adding ? 'Adding...' : added ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
