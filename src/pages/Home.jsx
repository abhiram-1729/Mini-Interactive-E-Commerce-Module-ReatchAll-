import React, { useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Loader2, ChevronLeft, ChevronRight, Layers, Shirt, Cpu, ShoppingBag, Coffee, Footprints, Dumbbell, Home as HomeIcon, SlidersHorizontal } from 'lucide-react';

import { PRODUCT_CATEGORIES } from '../constants/apiConstants';

const CATEGORY_ICONS = {
    'All': Layers,
    'Apparel': Shirt,
    'Electronics': Cpu,
    'Accessories': ShoppingBag,
    'Food & Beverage': Coffee,
    'Footwear': Footprints,
    'Fitness': Dumbbell,
    'Home & Living': HomeIcon,
};


const Home = ({ searchTerm }) => {
    const { products, loading, page, pages, count, category, setPage, setCategory, fetchProducts } = useProducts();
    const { addToCart } = useCart();

    const categories = ['All', ...PRODUCT_CATEGORIES];

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts(searchTerm, page, category === 'All' ? '' : category);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, page, category, fetchProducts]);

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container py-4 fade-in">
            <div className="page-header">
                <div className="page-header-left">
                    <h1>Our Products</h1>
                    <span className="items-found-badge">
                        {loading ? 'Finding...' : `${count} items`}
                    </span>
                </div>
                <div className="page-header-right">
                    <SlidersHorizontal size={16} />
                    <span>Filter by category</span>
                </div>
            </div>

            <div className="filters-section">
                <div className="category-filters">
                    {categories.map(cat => {
                        const Icon = CATEGORY_ICONS[cat] || Layers;
                        const isActive = category === cat || (cat === 'All' && !category);
                        return (
                            <button
                                key={cat}
                                className={`filter-btn ${isActive ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                <Icon size={14} />
                                <span>{cat}</span>
                            </button>
                        );
                    })}
                </div>
            </div>


            {loading ? (
                <div className="product-grid">
                    {[...Array(8)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="no-products fade-in text-center py-12">
                    <h2>No Products Found</h2>
                    <p className="text-muted">Try adjusting your search criteria or category.</p>
                </div>
            ) : (
                <div className="fade-in">
                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>

                    {pages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>

                            <div className="page-numbers">
                                {[...Array(pages).keys()].map(x => (
                                    <button
                                        key={x + 1}
                                        className={`page-num ${page === x + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(x + 1)}
                                    >
                                        {x + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="page-btn"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === pages}
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
