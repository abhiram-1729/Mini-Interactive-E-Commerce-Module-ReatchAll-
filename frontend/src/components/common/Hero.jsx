import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Flame, Sparkles, ChevronLeft } from 'lucide-react';

const SLIDES = [
    {
        badge: "Limited Time Offer",
        title: "Elite Hardware Collection",
        description: "Upgrade your workspace with premium mechanical keyboards and high-precision mice. Experience productivity at its peak.",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=80",
        btnText: "Shop Electronics",
        category: "Electronics"
    },
    {
        badge: "New Season",
        title: "Urban Style Essentials",
        description: "Discover the latest trends in premium cotton apparel. Comfortable, stylish, and made for the modern lifestyle.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80",
        btnText: "Explore Apparel",
        category: "Apparel"
    },
    {
        badge: "Premium Sound",
        title: "Immersive Audio Experience",
        description: "Noise-canceling headphones with crystal clear sound and 40-hour battery life. Your music, redefined.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        btnText: "View Audio",
        category: "Electronics"
    },
    {
        badge: "Interior Design",
        title: "Modern Home & Living",
        description: "Transform your home with artisanal decor and minimalist furniture. Premium quality for everyday comfort.",
        image: "https://plus.unsplash.com/premium_photo-1671534312576-845be6898618?q=80&w=2232&auto=format&fit=crop",
        btnText: "Shop Decor",
        category: "Home & Living"
    }
];

const Hero = ({ onCategoryClick }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero-section py-8">
            <div className="hero-main-card">
                <div className="slides-container h-full">
                    {SLIDES.map((slide, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
                        >
                            <div className="hero-left">
                                <span className="hero-badge">{slide.badge}</span>
                                <h1 className="hero-title">{slide.title}</h1>
                                <p className="hero-desc">{slide.description}</p>
                                <div className="hero-cta">
                                    <button
                                        className="btn-primary-large shadow-glow"
                                        onClick={() => onCategoryClick(slide.category)}
                                    >
                                        Shop Now
                                        <ChevronRight size={20} />
                                    </button>
                                    <button className="btn-secondary-large">Explore Deals</button>
                                </div>
                            </div>
                            <div className="hero-right">
                                <div className="promo-image-wrapper">
                                    <img src={slide.image} alt={slide.title} className="promo-image" />
                                    <div className="promo-floating-card">
                                        <div className="hot-deal-label">
                                            <Flame size={16} />
                                            <span>Hot Deal</span>
                                        </div>
                                        <h4>Limited Offer</h4>
                                        <p>Up to 40% Off on this category</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hero-indicators">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`hero-dot ${currentSlide === i ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(i)}
                        />
                    ))}
                </div>
            </div>

            <div className="hero-sidebar-grid mt-6">
                <div className="hero-featured-promo electronics shadow-sm" onClick={() => onCategoryClick('Electronics')}>
                    <div className="promo-text">
                        <h3>Tech Deals</h3>
                        <p>Save 20% on Gadgets</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" alt="Electronics" />
                </div>
                <div className="hero-featured-promo fashion shadow-sm" onClick={() => onCategoryClick('Apparel')}>
                    <div className="promo-text">
                        <h3>Fashion Peak</h3>
                        <p>Latest Trends</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" alt="Fashion" />
                </div>
                <div className="hero-featured-promo deals-pill shadow-sm" onClick={() => onCategoryClick('All')}>
                    <Sparkles size={20} className="text-yellow-500" />
                    <span>View All Exclusive Deals</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
