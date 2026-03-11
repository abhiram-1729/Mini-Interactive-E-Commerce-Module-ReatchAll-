import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, Check, Star, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, isTrending = false }) => {
    const [adding, setAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setAdding(true);
        try {
            await onAddToCart(product._id);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className={`product-card-premium ${isTrending ? 'trending-card' : ''}`}>
            <div className="product-image-container">
                <Link to={`/product/${product._id}`} className="product-image-link">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="main-product-img"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
                        }}
                    />
                    <div className="product-badges">
                        <span className="badge-cat">{product.category}</span>
                        {product.stock < 5 && product.stock > 0 && <span className="badge-alert">Low Stock</span>}
                    </div>
                    <div className="product-actions-overlay">
                        <button className="icon-action-btn" onClick={(e) => e.preventDefault()} title="Quick View">
                            <Eye size={16} />
                        </button>
                        <button
                            className={`icon-action-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
                            title="Wishlist"
                        >
                            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>
                </Link>
            </div>

            <div className="product-details-content">
                <div className="rating-row">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill={i < 4 ? "#f59e0b" : "none"} color={i < 4 ? "#f59e0b" : "#cbd5e1"} />
                        ))}
                    </div>
                    <span className="review-count">(42)</span>
                </div>

                <Link to={`/product/${product._id}`} className="product-title-link">
                    <h3 className="product-name-premium">{product.name}</h3>
                </Link>

                <p className="product-desc-premium">{product.description}</p>

                <div className="product-card-footer">
                    <div className="price-container">
                        <span className="currency">₹</span>
                        <span className="amount">{product.price}</span>
                    </div>
                    <button
                        className={`mini-add-btn ${showSuccess ? 'added' : ''}`}
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || adding || showSuccess}
                    >
                        {adding ? <Loader2 size={15} className="spin-icon" /> : showSuccess ? <Check size={15} /> : <Plus size={15} />}
                        <span>{adding ? '...' : showSuccess ? 'Done' : 'Add'}</span>
                    </button>
                </div>

                {product.stock === 0 && <p className="out-of-stock-label">Out of Stock</p>}
            </div>
        </div>
    );
};

export default ProductCard;
