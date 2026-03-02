import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get cart items
// @route   GET /api/cart
// @access  Private
export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id }).populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = await Cart.findOne({ user: req.user._id, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * product.price;
            await cartItem.save();
            res.json(cartItem);
        } else {
            const newCartItem = new Cart({
                user: req.user._id,
                productId,
                quantity,
                totalPrice: quantity * product.price
            });
            const createdCartItem = await newCartItem.save();
            res.status(201).json(createdCartItem);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user._id });
        if (cartItem) {
            await cartItem.deleteOne();
            res.json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
