const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { body } = require('express-validator');
const { getProgress, markComplete, unmarkLesson, getStats } = require('../controllers/progress.controller');

/**
 * @swagger
 * /api/progress/{userId}:
 *   get:
 *     summary: Get full progress document
 *     tags: [Progress]
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
 *         description: Progress document
 *       404:
 *         description: Progress not found
 */
router.get('/:userId', protect, getProgress);

/**
 * @swagger
 * /api/progress/{userId}/complete:
 *   post:
 *     summary: Mark a lesson as complete
 *     tags: [Progress]
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
 *               - lessonId
 *               - sectionId
 *             properties:
 *               lessonId:
 *                 type: string
 *               sectionId:
 *                 type: string
 *               moduleId:
 *                 type: string
 *                 default: git
 *     responses:
 *       200:
 *         description: Lesson marked complete
 *       422:
 *         description: Validation error
 */
router.post('/:userId/complete', protect, [
  body('lessonId').notEmpty().withMessage('lessonId is required'),
  body('sectionId').notEmpty().withMessage('sectionId is required'),
], markComplete);

/**
 * @swagger
 * /api/progress/{userId}/lesson/{lessonId}:
 *   delete:
 *     summary: Unmark a lesson
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson unmarked
 */
router.delete('/:userId/lesson/:lessonId', protect, unmarkLesson);

/**
 * @swagger
 * /api/progress/{userId}/stats:
 *   get:
 *     summary: Get computed stats (streak, completion %, time)
 *     tags: [Progress]
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
 *         description: Stats object
 */
router.get('/:userId/stats', protect, getStats);

module.exports = router;
