import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCartItems, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart);
router.delete('/', protect, clearCart);

export default router;
