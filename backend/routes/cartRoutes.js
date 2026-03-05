import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCartItems, addToCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeFromCart);

export default router;
