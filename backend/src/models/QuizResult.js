const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true },
    selectedOption: { type: String, required: true }, // 'A' | 'B' | 'C' | 'D'
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    moduleId: { type: String, required: true, default: 'git' },
    answers: { type: [answerSchema], required: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    scorePercent: { type: Number, required: true },
    passed: { type: Boolean, required: true }, // true if score >= 7
    timeTakenSeconds: { type: Number, default: null },
    attemptNumber: { type: Number, default: 1 },
  },
  { timestamps: true }
);

quizResultSchema.statics.getBestAttempt = async function (userId, moduleId = 'git') {
  return this.findOne({ userId, moduleId }).sort({ score: -1 }).lean();
};

quizResultSchema.statics.getAttemptCount = async function (userId, moduleId = 'git') {
  return this.countDocuments({ userId, moduleId });
};

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
module.exports = QuizResult;
