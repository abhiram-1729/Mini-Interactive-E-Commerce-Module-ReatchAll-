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
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
            <div style={{
                marginTop: 'auto',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="skeleton" style={{ width: '60px', height: '1.2rem' }}></div>
                <div className="skeleton" style={{ width: '80px', height: '2rem', borderRadius: '8px' }}></div>
            </div>
        </div>
    </div>
);

export const ProductDetailsSkeleton = () => (
    <div className="container py-8 fade-in">
        <div className="skeleton" style={{ width: '150px', height: '1.2rem', marginBottom: '2rem' }}></div>
        <div className="product-details-grid">
            <div className="product-viewer">
                <div className="skeleton section-glass" style={{ height: '500px', width: '100%', borderRadius: '2rem' }}></div>
            </div>
            <div className="product-content">
                <div className="skeleton" style={{ width: '100px', height: '1rem', marginBottom: '1rem' }}></div>
                <div className="skeleton skeleton-title" style={{ width: '90%', height: '3.5rem', marginBottom: '1.5rem' }}></div>
                <div className="skeleton" style={{ width: '120px', height: '1.5rem', marginBottom: '2rem' }}></div>
                <div className="skeleton" style={{ width: '180px', height: '2.5rem', marginBottom: '2.5rem' }}></div>

                <div className="skeleton" style={{ width: '150px', height: '1.5rem', marginBottom: '1rem' }}></div>
                <div className="skeleton skeleton-text" style={{ height: '1.1rem' }}></div>
                <div className="skeleton skeleton-text" style={{ height: '1.1rem' }}></div>
                <div className="skeleton skeleton-text" style={{ height: '1.1rem', width: '60%', marginBottom: '2.5rem' }}></div>

                <div className="product-utility-grid" style={{ marginBottom: '2.5rem' }}>
                    <div className="skeleton" style={{ height: '4rem', borderRadius: '1rem' }}></div>
                    <div className="skeleton" style={{ height: '4rem', borderRadius: '1rem' }}></div>
                </div>

                <div className="skeleton" style={{ width: '100%', height: '4.5rem', borderRadius: '1.25rem' }}></div>
            </div>
        </div>
    </div>
);

export const CartItemSkeleton = () => (
    <div className="cart-item skeleton-cart-item fade-in">
        <div className="skeleton" style={{ width: '100px', height: '100px', borderRadius: '12px' }}></div>
        <div className="item-details">
            <div className="skeleton skeleton-title" style={{ width: '60%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
            <div className="skeleton skeleton-action" style={{ width: '100px', height: '2rem' }}></div>
        </div>
        <div className="item-total">
            <div className="skeleton" style={{ width: '80px', height: '1.5rem' }}></div>
            <div className="skeleton skeleton-circle" style={{ width: '24px', height: '24px' }}></div>
        </div>
    </div>
);

export default Skeleton;
