import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2, CheckCircle, Image as ImageIcon, PlusCircle, IndianRupee, Tag, Layers, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES, API_BASE_URL } from '../constants/apiConstants';

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

    const categories = PRODUCT_CATEGORIES;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image');
            return;
        }
        setUploading(true);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfo.token}`
                },
            };

            await axios.post(`${API_BASE_URL}/products`, formData, config);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Error creating product. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="container py-12">
                <div className="auth-card text-center py-12">
                    <CheckCircle size={80} color="#10b981" className="mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Product Uploaded!</h2>
                    <p className="text-muted">Redirecting you to the storefront...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8 fade-in">
            <div className="auth-card upload-page-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="auth-header">
                    <div className="auth-icon" style={{ background: 'linear-gradient(135deg, var(--secondary-color), #f472b6)' }}>
                        <PlusCircle size={32} />
                    </div>
                    <h1>List New Product</h1>
                    <p className="text-muted">Fill in the details to add a new item to the collection</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="upload-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="upload-left-col">
                            <div className="form-group">
                                <label><Tag size={16} style={{ marginRight: '8px' }} />Product Name</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="e.g. Wireless Headset"
                                        style={{ paddingLeft: '1rem' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label><IndianRupee size={16} style={{ marginRight: '8px' }} />Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                        placeholder="999"
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Layers size={16} style={{ marginRight: '8px' }} />Stock</label>
                                    <input
                                        type="number"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                        placeholder="50"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="custom-select">
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label><FileText size={16} style={{ marginRight: '8px' }} />Description</label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Write a compelling product description..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="upload-right-col">
                            <div className="form-group">
                                <label><ImageIcon size={16} style={{ marginRight: '8px' }} />Product Image</label>
                                <div className="image-preview-container">
                                    {preview ? (
                                        <img src={preview} alt="Preview" />
                                    ) : (
                                        <div className="no-preview">
                                            <ImageIcon size={48} className="text-muted mb-2" />
                                            <p className="text-muted">No image selected</p>
                                        </div>
                                    )}
                                </div>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleFileChange}
                                        required
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-upload" className="auth-btn" style={{ background: 'var(--secondary-color)', marginTop: '0' }}>
                                        <Upload size={20} className="mr-2" />
                                        Select Image
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={uploading} style={{ marginTop: '2rem' }}>
                        {uploading ? (
                            <>
                                <Loader2 size={24} className="animate-spin mr-2" />
                                Processing Upload...
                            </>
                        ) : (
                            <>
                                <PlusCircle size={24} className="mr-2" />
                                Submit Listing
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadProduct;
