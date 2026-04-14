const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { body } = require('express-validator');
const { submitQuiz, getResults, getBestResult } = require('../controllers/quiz.controller');

/**
 * @swagger
 * /api/quiz/{userId}/submit:
 *   post:
 *     summary: Submit quiz attempt and get score
 *     tags: [Quiz]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 minItems: 10
 *                 maxItems: 10
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                     selectedOption:
 *                       type: string
 *                       enum: [A, B, C, D]
 *               timeTakenSeconds:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Quiz result
 *       422:
 *         description: Validation error
 */
router.post('/:userId/submit', protect, [
  body('answers').isArray({ min: 10, max: 10 }).withMessage('Must provide exactly 10 answers'),
  body('answers.*.questionId').isInt({ min: 1, max: 10 }).withMessage('Invalid questionId'),
  body('answers.*.selectedOption').isIn(['A', 'B', 'C', 'D']).withMessage('Option must be A, B, C, or D'),
  body('timeTakenSeconds').optional().isInt({ min: 0 }),
], submitQuiz);

/**
 * @swagger
 * /api/quiz/{userId}/results:
 *   get:
 *     summary: Get all past quiz attempts
 *     tags: [Quiz]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of quiz results
 */
router.get('/:userId/results', protect, getResults);

/**
 * @swagger
 * /api/quiz/{userId}/best:
 *   get:
 *     summary: Get best quiz attempt score
 *     tags: [Quiz]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Best quiz result
 *       404:
 *         description: No quiz attempts found
 */
router.get('/:userId/best', protect, getBestResult);

module.exports = router;
