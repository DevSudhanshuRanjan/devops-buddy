const { validationResult } = require('express-validator');
const Progress = require('../models/Progress');
const User = require('../models/User');

const checkOwnership = (req, userId) => req.user.id === userId || req.user.role === 'admin';

const getProgress = async (req, res) => {
  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) return res.status(404).json({ error: 'Progress not found.' });

    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress.' });
  }
};

const markComplete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const { lessonId, sectionId, moduleId = 'git' } = req.body;

    let progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) progress = await Progress.create({ userId: req.params.userId, moduleId });

    const added = progress.markLessonComplete(lessonId, sectionId, moduleId);
    await progress.save();

    if (added) {
      const user = await User.findById(req.params.userId);
      if (user) { user.updateStreak(); await user.save(); }
    }

    res.status(200).json({
      message: added ? 'Lesson marked complete.' : 'Already complete.',
      progress,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark lesson complete.' });
  }
};

const unmarkLesson = async (req, res) => {
  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) return res.status(404).json({ error: 'Progress not found.' });

    const removed = progress.unmarkLesson(req.params.lessonId);
    await progress.save();

    res.status(200).json({ message: removed ? 'Lesson unmarked.' : 'Not in completed list.', progress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unmark lesson.' });
  }
};

const getStats = async (req, res) => {
  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const [progress, user] = await Promise.all([
      Progress.findOne({ userId: req.params.userId }),
      User.findById(req.params.userId),
    ]);

    if (!progress || !user) return res.status(404).json({ error: 'Data not found.' });

    const lessonsLeft = progress.totalLessons - progress.completedLessons.length;

    res.status(200).json({
      stats: {
        completedLessons: progress.completedLessons.length,
        totalLessons: progress.totalLessons,
        completionPercent: progress.completionPercent,
        isModuleComplete: progress.isModuleComplete,
        estimatedMinutesSpent: progress.estimatedMinutesSpent,
        estimatedMinutesLeft: lessonsLeft * 6,
        currentStreak: user.streak.current,
        longestStreak: user.streak.longest,
        lastActivityAt: progress.lastActivityAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
};

module.exports = { getProgress, markComplete, unmarkLesson, getStats };
