const { validationResult } = require('express-validator');
const QuizResult = require('../models/QuizResult');

// Server-side ground truth — never expose this to the client
const CORRECT_ANSWERS = {
  1: 'C', 2: 'B', 3: 'C', 4: 'B', 5: 'A',
  6: 'C', 7: 'B', 8: 'B', 9: 'B', 10: 'B',
};

const checkOwnership = (req, userId) => req.user.id === userId || req.user.role === 'admin';

const submitQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const { answers, timeTakenSeconds } = req.body;

    const gradedAnswers = answers.map(({ questionId, selectedOption }) => ({
      questionId,
      selectedOption,
      isCorrect: CORRECT_ANSWERS[questionId] === selectedOption,
    }));

    const score = gradedAnswers.filter((a) => a.isCorrect).length;
    const scorePercent = Math.round((score / 10) * 100);
    const passed = score >= 7;
    const attemptNumber = (await QuizResult.getAttemptCount(req.params.userId)) + 1;

    const result = await QuizResult.create({
      userId: req.params.userId,
      moduleId: 'git',
      answers: gradedAnswers,
      score,
      scorePercent,
      passed,
      timeTakenSeconds: timeTakenSeconds || null,
      attemptNumber,
    });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz.' });
  }
};

const getResults = async (req, res) => {
  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const results = await QuizResult.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }).lean();

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results.' });
  }
};

const getBestResult = async (req, res) => {
  try {
    if (!checkOwnership(req, req.params.userId))
      return res.status(403).json({ error: 'Access denied.' });

    const best = await QuizResult.getBestAttempt(req.params.userId);
    if (!best) return res.status(404).json({ error: 'No quiz attempts found.' });

    res.status(200).json({ best });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch best result.' });
  }
};

module.exports = { submitQuiz, getResults, getBestResult };
