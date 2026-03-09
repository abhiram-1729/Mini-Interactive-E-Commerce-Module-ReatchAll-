import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Upload, Loader2, CheckCircle, Image as ImageIcon,
    PlusCircle, IndianRupee, Tag, Layers, FileText, PackagePlus, Sparkles
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../constants/apiConstants';
import * as api from '../api';

const UploadProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) { alert('Please select a product image'); return; }
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        try {
            await api.createProduct(formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error uploading product:', error);
            const msg = error.response?.data?.message || 'Upload failed. Please try again.';
            alert(msg);
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div style={styles.fullPage}>
                <div style={styles.successCard}>
                    <div style={styles.successIconWrap}>
                        <CheckCircle size={56} color="#10b981" />
                    </div>
                    <h2 style={styles.successTitle}>Product Listed!</h2>
                    <p style={styles.successSub}>Redirecting to storefront...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.fullPage}>
            <div style={styles.panel}>
                {/* Left: Form */}
                <div style={styles.leftCol}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.iconBadge}>
                            <PackagePlus size={22} color="white" />
                        </div>
                        <div>
                            <h1 style={styles.title}>New Product</h1>
                            <p style={styles.subtitle}>Fill in details to list a product</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {/* Product Name */}
                        <div style={styles.field}>
                            <label style={styles.label}><Tag size={13} style={styles.labelIcon} />Product Name</label>
                            <input style={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Wireless Headphones" />
                        </div>

                        {/* Price & Stock */}
                        <div style={styles.twoCol}>
                            <div style={styles.field}>
                                <label style={styles.label}><IndianRupee size={13} style={styles.labelIcon} />Price (Rs.)</label>
                                <input style={styles.input} type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="1299" min="0" />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}><Layers size={13} style={styles.labelIcon} />Stock</label>
                                <input style={styles.input} type="number" value={stock} onChange={e => setStock(e.target.value)} required placeholder="50" min="0" />
                            </div>
                        </div>

                        {/* Category */}
                        <div style={styles.field}>
                            <label style={styles.label}><Sparkles size={13} style={styles.labelIcon} />Category</label>
                            <select style={{ ...styles.input, ...styles.select }} value={category} onChange={e => setCategory(e.target.value)}>
                                {PRODUCT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Description */}
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}><FileText size={13} style={styles.labelIcon} />Description</label>
                            <textarea style={{ ...styles.input, ...styles.textarea }} value={description} onChange={e => setDescription(e.target.value)} required placeholder="Describe the product..." />
                        </div>

                        {/* Submit button */}
                        <button type="submit" style={uploading ? { ...styles.submitBtn, ...styles.submitBtnDisabled } : styles.submitBtn} disabled={uploading}>
                            {uploading
                                ? <><Loader2 size={18} style={styles.spinIcon} /> Processing...</>
                                : <><PlusCircle size={18} style={{ marginRight: 8 }} /> Submit Listing</>
                            }
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div style={styles.divider} />

                {/* Right: Image upload */}
                <div style={styles.rightCol}>
                    <label style={styles.label}><ImageIcon size={13} style={styles.labelIcon} />Product Image</label>
                    <div style={preview ? { ...styles.dropZone, ...styles.dropZoneHasImage } : styles.dropZone}>
                        {preview
                            ? <img src={preview} alt="Preview" style={styles.previewImg} />
                            : (
                                <div style={styles.dropHint}>
                                    <ImageIcon size={42} color="#94a3b8" />
                                    <p style={styles.dropText}>Click below to select an image</p>
                                    <p style={styles.dropSub}>JPG, PNG, WebP, AVIF — max 10MB</p>
                                </div>
                            )
                        }
                    </div>
                    <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                    <label htmlFor="file-upload" style={styles.uploadBtn}>
                        <Upload size={16} style={{ marginRight: 8 }} />
                        {preview ? 'Change Image' : 'Select Image'}
                    </label>
                    {image && <p style={styles.fileName}>{image.name}</p>}
                </div>
            </div>
        </div>
    );
};

const styles = {
    fullPage: {
        height: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)',
        padding: '0 1.5rem',
        overflow: 'hidden',
    },
    panel: {
        display: 'flex',
        background: 'white',
        borderRadius: '1.75rem',
        boxShadow: '0 25px 60px -10px rgba(0,0,0,0.12)',
        border: '1px solid rgba(226,232,240,0.8)',
        width: '100%',
        maxWidth: '900px',
        height: '580px',
        overflow: 'hidden',
    },
    leftCol: {
        flex: 1,
        padding: '2rem 2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        overflow: 'hidden',
    },
    divider: {
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)',
        margin: '1.5rem 0',
    },
    rightCol: {
        width: '280px',
        padding: '2rem 2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        marginBottom: '0.5rem',
    },
    iconBadge: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
    },
    title: {
        fontSize: '1.35rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0,
        lineHeight: 1.2,
    },
    subtitle: {
        fontSize: '0.78rem',
        color: '#94a3b8',
        margin: 0,
        marginTop: '2px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        flex: 1,
        overflow: 'hidden',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    twoCol: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.76rem',
        fontWeight: 700,
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    },
    labelIcon: {
        marginRight: '5px',
        color: '#6366f1',
    },
    input: {
        padding: '0.5rem 0.75rem',
        borderRadius: '10px',
        border: '1.5px solid #e2e8f0',
        fontSize: '0.875rem',
        color: '#1e293b',
        background: '#f8fafc',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
    },
    select: {
        appearance: 'none',
        cursor: 'pointer',
    },
    textarea: {
        resize: 'none',
        minHeight: '80px',
        flex: 1,
        lineHeight: 1.5,
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.7rem',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 700,
        cursor: 'pointer',
        marginTop: '0.35rem',
        boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
    },
    submitBtnDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
    spinIcon: {
        marginRight: 8,
        animation: 'spin 1s linear infinite',
    },
    // Right col
    dropZone: {
        flex: 1,
        border: '2px dashed #e2e8f0',
        borderRadius: '1.25rem',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
        minHeight: '200px',
    },
    dropZoneHasImage: {
        border: '2px solid #a5b4fc',
        background: '#f0f4ff',
    },
    previewImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    dropHint: {
        textAlign: 'center',
        padding: '1rem',
    },
    dropText: {
        marginTop: '0.75rem',
        fontSize: '0.8rem',
        color: '#64748b',
        fontWeight: 500,
    },
    dropSub: {
        marginTop: '0.25rem',
        fontSize: '0.7rem',
        color: '#94a3b8',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.6rem 1rem',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        fontSize: '0.82rem',
        fontWeight: 700,
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '0 3px 10px rgba(99,102,241,0.25)',
        transition: 'opacity 0.2s',
        userSelect: 'none',
    },
    fileName: {
        fontSize: '0.7rem',
        color: '#94a3b8',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        margin: 0,
    },
    // Success view
    successCard: {
        background: 'white',
        borderRadius: '2rem',
        padding: '3.5rem',
        textAlign: 'center',
        boxShadow: '0 25px 60px -10px rgba(0,0,0,0.1)',
    },
    successIconWrap: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: '#ecfdf5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
    },
    successTitle: {
        fontSize: '1.75rem',
        fontWeight: 800,
        color: '#1e293b',
        marginBottom: '0.5rem',
    },
    successSub: {
        color: '#94a3b8',
        fontSize: '0.9rem',
    },
};

export default UploadProduct;
