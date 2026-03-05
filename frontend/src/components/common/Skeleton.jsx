import React from 'react';

const Skeleton = ({ className, width, height, borderRadius }) => {
    const style = {
        width: width || '100%',
        height: height || '1rem',
        borderRadius: borderRadius || '8px'
    };

    return <div className={`skeleton ${className || ''}`} style={style}></div>;
};

export const ProductCardSkeleton = () => (
    <div className="skeleton-card">
        <div className="skeleton skeleton-img"></div>
        <div style={{ padding: '1.5rem' }}>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '80px', height: '1.5rem' }}></div>
                <div className="skeleton" style={{ width: '100px', height: '2.5rem', borderRadius: '12px' }}></div>
            </div>
        </div>
    </div>
);

export const ProductDetailsSkeleton = () => (
    <div className="container py-8">
        <div className="skeleton" style={{ width: '120px', height: '1.5rem', marginBottom: '1.5rem' }}></div>
        <div className="product-details-grid">
            <div className="skeleton section-glass" style={{ height: '600px', borderRadius: '2rem' }}></div>
            <div className="section-glass">
                <div className="skeleton skeleton-title" style={{ width: '80%', height: '3rem' }}></div>
                <div className="skeleton" style={{ width: '40%', height: '1.5rem', marginBottom: '2rem' }}></div>
                <div className="skeleton" style={{ width: '30%', height: '2.5rem', marginBottom: '2.5rem' }}></div>

                <div className="skeleton skeleton-text" style={{ height: '1.2rem' }}></div>
                <div className="skeleton skeleton-text" style={{ height: '1.2rem' }}></div>
                <div className="skeleton skeleton-text" style={{ height: '1.2rem', width: '60%', marginBottom: '2.5rem' }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div className="skeleton" style={{ height: '3.5rem', borderRadius: '1rem' }}></div>
                    <div className="skeleton" style={{ height: '3.5rem', borderRadius: '1rem' }}></div>
                </div>

                <div className="skeleton" style={{ width: '100%', height: '4rem', borderRadius: '1.25rem' }}></div>
            </div>
        </div>
    </div>
);

export const CartItemSkeleton = () => (
    <div className="cart-item" style={{ borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}>
        <div className="skeleton" style={{ width: '100px', height: '100px', borderRadius: '8px' }}></div>
        <div className="item-details" style={{ flex: 1, marginLeft: '1.5rem' }}>
            <div className="skeleton skeleton-title" style={{ width: '60%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
            <div className="skeleton" style={{ width: '100px', height: '2rem', marginTop: '1rem' }}></div>
        </div>
        <div className="item-total" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div className="skeleton" style={{ width: '80px', height: '1.2rem' }}></div>
            <div className="skeleton skeleton-circle" style={{ width: '24px', height: '24px' }}></div>
        </div>
    </div>
);

export default Skeleton;
