const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { googleCallback, getMe, logout } = require('../controllers/auth.controller');
const protect = require('../middleware/auth');

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Auth]
 *     description: Redirects user to Google login page
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     description: Handles Google callback, issues JWT, redirects to frontend
 *     responses:
 *       302:
 *         description: Redirect to frontend with token
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`,
  }),
  googleCallback
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user object
 *       401:
 *         description: Not authenticated
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out and clear token
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', protect, logout);

module.exports = router;
