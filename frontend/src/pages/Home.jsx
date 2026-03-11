import React, { useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/common/Skeleton';
import Hero from '../components/common/Hero';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ChevronLeft, ChevronRight, Layers, Shirt, Cpu, ShoppingBag, Coffee, Footprints, Dumbbell, Home as HomeIcon, SlidersHorizontal } from 'lucide-react';

import { PRODUCT_CATEGORIES } from '../constants/apiConstants';

import QuickCategories from '../components/home/QuickCategories';
import TrendingProducts from '../components/home/TrendingProducts';
import DealOfTheDay from '../components/home/DealOfTheDay';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

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
            const catalog = document.getElementById('catalog');
            if (catalog) {
                catalog.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="home-wrapper fade-in">
            <div className="container">
                {/* 1. Hero Section */}
                <Hero onCategoryClick={handleCategoryChange} />

                {/* 2. Quick Category Section */}
                <QuickCategories onCategoryClick={handleCategoryChange} />

                {/* 3. Trending Products Section */}
                {!loading && products.length > 0 && (
                    <TrendingProducts products={products} onAddToCart={addToCart} />
                )}

                {/* 4. Deal of the Day Section */}
                <DealOfTheDay onAddToCart={addToCart} />

                {/* 5. Improved Existing Product Grid */}
                <section className="main-catalog py-12" id="catalog">
                    <div className="page-header mb-8">
                        <div className="page-header-left">
                            <h2 className="section-title">Explore Our Collection</h2>
                            <p className="section-subtitle">Premium products selected just for you</p>
                        </div>
                        <div className="page-header-right bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                            <span className="items-found-badge px-3 py-1 bg-primary/10 text-primary rounded-full font-bold">
                                {loading ? 'Finding...' : `${count} items`}
                            </span>
                        </div>
                    </div>

                    <div className="filters-container mb-10">
                        <div className="flex items-center gap-3 mb-4 text-slate-500 font-medium">
                            <SlidersHorizontal size={18} />
                            <span>Filter by Category</span>
                        </div>
                        <div className="category-filters-premium">
                            {categories.map(cat => {
                                const Icon = CATEGORY_ICONS[cat] || Layers;
                                const isActive = category === cat || (cat === 'All' && !category);
                                return (
                                    <button
                                        key={cat}
                                        className={`premium-filter-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(cat)}
                                    >
                                        <Icon size={18} />
                                        <span>{cat}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {loading ? (
                        <div className="product-grid">
                            {[...Array(10)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="no-products text-center py-20 bg-slate-50 rounded-3xl">
                            <ShoppingBag size={64} className="mx-auto text-slate-300 mb-4" />
                            <h2 className="text-2xl font-bold text-slate-800">No Products Found</h2>
                            <p className="text-slate-500">We couldn't find anything matching your criteria.</p>
                            <button
                                className="mt-6 btn-primary"
                                onClick={() => handleCategoryChange('All')}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="catalog-results">
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
                                <div className="pagination-premium mt-16">
                                    <button
                                        className="pag-btn"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft size={20} />
                                        <span>Previous</span>
                                    </button>

                                    <div className="pag-numbers">
                                        {[...Array(pages).keys()].map(x => (
                                            <button
                                                key={x + 1}
                                                className={`pag-num ${page === x + 1 ? 'active' : ''}`}
                                                onClick={() => handlePageChange(x + 1)}
                                            >
                                                {x + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="pag-btn"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === pages}
                                    >
                                        <span>Next</span>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 6. Feature Highlights Section */}
                <Features />

                {/* 7. Testimonials Section */}
                <Testimonials />

                {/* 8. Newsletter Subscription Section */}
                <Newsletter />
            </div>
        </div>
    );
};

export default Home;
