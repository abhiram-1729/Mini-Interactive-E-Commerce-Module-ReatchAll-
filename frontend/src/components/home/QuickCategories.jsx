import React from 'react';
import { Cpu, Shirt, Footprints, Dumbbell, Home, Watch } from 'lucide-react';

const CATEGORIES = [
    { name: 'Electronics', icon: Cpu, color: '#f0f9ff', iconColor: '#0ea5e9' },
    { name: 'Apparel', icon: Shirt, color: '#fdf2f8', iconColor: '#ec4899' },
    { name: 'Footwear', icon: Footprints, color: '#fff7ed', iconColor: '#f97316' },
    { name: 'Fitness', icon: Dumbbell, color: '#f0fdf4', iconColor: '#22c55e' },
    { name: 'Home & Living', icon: Home, color: '#f5f3ff', iconColor: '#8b5cf6' },
    { name: 'Accessories', icon: Watch, color: '#fff1f2', iconColor: '#f43f5e' },
];

const QuickCategories = ({ onCategoryClick }) => {
    return (
        <section className="quick-categories">
            <div className="section-header">
                <h2 className="section-title">Shop by Category</h2>
                <p className="section-subtitle">Discover our wide range of premium products</p>
            </div>
            <div className="categories-scroll-wrapper">
                <div className="categories-grid">
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.name}
                            className="quick-cat-card"
                            onClick={() => onCategoryClick(cat.name)}
                        >
                            <div className="cat-icon-wrapper" style={{ backgroundColor: cat.color }}>
                                <cat.icon size={26} color={cat.iconColor} />
                            </div>
                            <h3>{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickCategories;
