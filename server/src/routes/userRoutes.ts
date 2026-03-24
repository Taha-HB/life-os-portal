import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProfile,
  updateProfile,
  updateSettings,
  getStats,
  updatePortfolio,
  getPortfolio,
  deleteAccount
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/settings', updateSettings);
router.get('/stats', getStats);
router.get('/portfolio', getPortfolio);
router.put('/portfolio', updatePortfolio);
router.delete('/account', deleteAccount);

export default router;
