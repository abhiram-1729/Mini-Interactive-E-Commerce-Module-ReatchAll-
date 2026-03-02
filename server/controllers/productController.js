import Product from '../models/Product.js';

// @desc    Get all products with pagination and filter
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 8;
        const page = Number(req.query.page) || 1;

        const keyword = req.query.search ? {
            name: {
                $regex: req.query.search,
                $options: 'i'
            }
        } : {};

        const category = req.query.category ? { category: req.query.category } : {};

        const count = await Product.countDocuments({ ...keyword, ...category });
        const products = await Product.find({ ...keyword, ...category })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize), count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add product with image upload
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const image = req.file
            ? `http://localhost:5001/uploads/${req.file.filename}`
            : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';

        const product = new Product({
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            image
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
