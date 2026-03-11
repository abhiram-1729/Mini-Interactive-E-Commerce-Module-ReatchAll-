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
            <div className="loading-state">
                <div className="auth-card text-center">
                    <div className="auth-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                        <CheckCircle size={40} />
                    </div>
                    <h1>Product Listed!</h1>
                    <p>Redirecting to store...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="auth-card upload-page-card fade-in">
                <div className="auth-header">
                    <div className="auth-icon">
                        <PackagePlus size={32} />
                    </div>
                    <h1>List New Product</h1>
                    <p>Enter the details below to add a new item to the store</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="upload-grid-layout">
                        <div className="upload-left-col">
                            <div className="form-group">
                                <label><Tag size={16} /> Product Name</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        placeholder="e.g. Wireless Headphones"
                                    />
                                </div>
                            </div>

                            <div className="form-group-row">
                                <div className="form-group">
                                    <label><IndianRupee size={16} /> Price</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                            required
                                            placeholder="1299"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label><Layers size={16} /> Stock</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="number"
                                            value={stock}
                                            onChange={e => setStock(e.target.value)}
                                            required
                                            placeholder="50"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label><Sparkles size={16} /> Category</label>
                                <select
                                    className="input-with-icon custom-select"
                                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#f8fafc' }}
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {PRODUCT_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label><FileText size={16} /> Description</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    placeholder="Describe the product details and features..."
                                />
                            </div>
                        </div>

                        <div className="upload-right-col">
                            <label><ImageIcon size={16} /> Product Image</label>
                            <div className={`image-preview-container ${preview ? 'has-image' : ''}`}>
                                {preview ? (
                                    <img src={preview} alt="Preview" />
                                ) : (
                                    <div className="no-preview">
                                        <ImageIcon size={48} strokeWidth={1} />
                                        <p>No image selected</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className="auth-btn" style={{ marginTop: 0 }}>
                                <Upload size={18} style={{ marginRight: 8 }} />
                                {preview ? 'Change Image' : 'Select Image'}
                            </label>
                            {image && <p className="file-name-hint">{image.name}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={uploading}
                        style={{ marginTop: '2rem' }}
                    >
                        {uploading ? (
                            <><Loader2 size={18} className="animate-spin" style={{ marginRight: 8 }} /> Processing...</>
                        ) : (
                            <><PlusCircle size={18} style={{ marginRight: 8 }} /> List Product</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadProduct;
