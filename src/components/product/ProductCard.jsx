import React, { useState } from 'react';
import { Plus, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent navigation if button is inside Link (though we'll structure it outside)
        setAdding(true);
        try {
            await onAddToCart(product._id);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`} className="product-card-link">
                <div className="product-image">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
                        }}
                    />
                    <span className="category-tag">{product.category}</span>
                    <div className="view-details-overlay">
                        <ExternalLink size={24} />
                        <span>View Details</span>
                    </div>
                </div>
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                </div>
            </Link>
            <div className="product-card-footer-action">
                <div className="product-footer">
                    <span className="price">Rs.{product.price}</span>
                    <button
                        className="add-btn"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || adding}
                    >
                        {adding ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Plus size={18} />
                        )}
                        {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
                {product.stock < 10 && product.stock > 0 && (
                    <p className="stock-warning">Only {product.stock} left!</p>
                )}
                {product.stock === 0 && (
                    <p className="stock-out">Out of Stock</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
