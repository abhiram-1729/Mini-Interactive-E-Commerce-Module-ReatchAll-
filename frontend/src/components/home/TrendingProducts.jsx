import React from 'react';
import ProductCard from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

const TrendingProducts = ({ products, onAddToCart }) => {
    if (!products || products.length === 0) return null;
    const trendingProducts = products.slice(0, 6);

    return (
        <section className="trending-section">
            <div className="trending-header">
                <div>
                    <div className="trending-label">
                        <Sparkles size={16} />
                        <span>TOP PICKS</span>
                    </div>
                    <h2 className="section-title">Trending Now</h2>
                </div>
                <button className="view-all-link">View All</button>
            </div>

            <div className="trending-scroll-wrapper">
                <div className="trending-cards-row">
                    {trendingProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={onAddToCart}
                            isTrending={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
