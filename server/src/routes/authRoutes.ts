import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuth,
  googleAuthCallback,
  getCurrentUser,
  updateProfile,
  deleteAccount,
  checkEmailAvailability,
  enableTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
  getSecurityQuestions,
  verifySecurityQuestion
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Rate limiting configurations
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 emails per hour
  message: 'Too many email requests. Please try again later.',
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per minute
  message: 'Too many requests. Please slow down.',
});

// Apply global rate limiting to all auth routes
router.use(apiLimiter);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .isLength({ min: 8, max: 100 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
    
    body('timezone')
      .optional()
      .isString()
      .withMessage('Invalid timezone'),
    
    body('language')
      .optional()
      .isIn(['en', 'ar', 'fr', 'es', 'ur'])
      .withMessage('Invalid language selection'),
  ],
  validateRequest,
  register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  authLimiter,
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    
    body('rememberMe')
      .optional()
      .isBoolean()
      .withMessage('Invalid remember me value'),
  ],
  validateRequest,
  login
);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh-token',
  [
    body('refreshToken')
      .notEmpty()
      .withMessage('Refresh token is required'),
  ],
  validateRequest,
  refreshToken
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get('/verify-email/:token', verifyEmail);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
router.post(
  '/resend-verification',
  emailLimiter,
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  validateRequest,
  resendVerificationEmail
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post(
  '/forgot-password',
  emailLimiter,
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  validateRequest,
  forgotPassword
);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password using token
 * @access  Public
 */
router.post(
  '/reset-password/:token',
  [
    body('password')
      .isLength({ min: 8, max: 100 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ],
  validateRequest,
  resetPassword
);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password (authenticated users)
 * @access  Private
 */
router.post(
  '/change-password',
  protect,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    
    body('newPassword')
      .isLength({ min: 8, max: 100 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('confirmNewPassword')
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage('Passwords do not match'),
  ],
  validateRequest,
  changePassword
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get('/me', protect, getCurrentUser);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  protect,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('phone')
      .optional()
      .matches(/^\+?[\d\s-]{10,}$/)
      .withMessage('Please provide a valid phone number'),
    
    body('location.city')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('City name must be between 2 and 50 characters'),
    
    body('location.country')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Country name must be between 2 and 50 characters'),
    
    body('location.timezone')
      .optional()
      .isString()
      .withMessage('Invalid timezone'),
    
    body('profilePicture')
      .optional()
      .isURL()
      .withMessage('Invalid profile picture URL'),
  ],
  validateRequest,
  updateProfile
);

/**
 * @route   DELETE /api/auth/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete(
  '/account',
  protect,
  [
    body('password')
      .notEmpty()
      .withMessage('Password is required to delete account'),
    
    body('confirmDeletion')
      .equals('delete')
      .withMessage('Please type "delete" to confirm account deletion'),
  ],
  validateRequest,
  deleteAccount
);

/**
 * @route   POST /api/auth/check-email
 * @desc    Check if email is available
 * @access  Public
 */
router.post(
  '/check-email',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  validateRequest,
  checkEmailAvailability
);

/**
 * @route   POST /api/auth/google
 * @desc    Google OAuth authentication
 * @access  Public
 */
router.post(
  '/google',
  [
    body('token')
      .notEmpty()
      .withMessage('Google token is required'),
  ],
  validateRequest,
  googleAuth
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
router.get('/google/callback', googleAuthCallback);

/**
 * @route   POST /api/auth/2fa/enable
 * @desc    Enable two-factor authentication
 * @access  Private
 */
router.post(
  '/2fa/enable',
  protect,
  [
    body('password')
      .notEmpty()
      .withMessage('Password is required to enable 2FA'),
  ],
  validateRequest,
  enableTwoFactor
);

/**
 * @route   POST /api/auth/2fa/verify
 * @desc    Verify two-factor authentication code
 * @access  Private
 */
router.post(
  '/2fa/verify',
  protect,
  [
    body('code')
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage('Please provide a valid 6-digit code'),
  ],
  validateRequest,
  verifyTwoFactor
);

/**
 * @route   POST /api/auth/2fa/disable
 * @desc    Disable two-factor authentication
 * @access  Private
 */
router.post(
  '/2fa/disable',
  protect,
  [
    body('password')
      .notEmpty()
      .withMessage('Password is required to disable 2FA'),
    body('code')
      .optional()
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage('Please provide a valid 6-digit code'),
  ],
  validateRequest,
  disableTwoFactor
);

/**
 * @route   GET /api/auth/security-questions
 * @desc    Get security questions for account recovery
 * @access  Public
 */
router.get('/security-questions', getSecurityQuestions);

/**
 * @route   POST /api/auth/verify-security-question
 * @desc    Verify security question answer
 * @access  Public
 */
router.post(
  '/verify-security-question',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('questionId')
      .notEmpty()
      .withMessage('Question ID is required'),
    body('answer')
      .notEmpty()
      .withMessage('Answer is required'),
  ],
  validateRequest,
  verifySecurityQuestion
);

// Webhook endpoints for external services
router.post(
  '/webhook/telegram',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    // Handle Telegram webhook
    console.log('Telegram webhook received:', req.body);
    res.status(200).json({ received: true });
  }
);

// Health check endpoint for auth service
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'auth-service'
  });
});

export default router;
