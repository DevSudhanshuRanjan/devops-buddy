const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { body } = require('express-validator');
const { getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.get('/:id', protect, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update display name or avatar
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 maxLength: 60
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user
 *       422:
 *         description: Validation error
 */
router.patch('/:id', protect, [
  body('displayName').optional().trim().isLength({ max: 60 }).withMessage('Max 60 characters'),
], updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete account and all associated data
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted
 *       403:
 *         description: Access denied
 */
router.delete('/:id', protect, deleteUser);

module.exports = router;
