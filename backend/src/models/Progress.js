const mongoose = require('mongoose');

const completedLessonSchema = new mongoose.Schema(
  {
    lessonId: { type: String, required: true },   // e.g. 'l1'
    sectionId: { type: String, required: true },  // e.g. 'sec1'
    moduleId: { type: String, required: true, default: 'git' },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    moduleId: { type: String, required: true, default: 'git' },
    completedLessons: { type: [completedLessonSchema], default: [] },
    totalLessons: { type: Number, default: 21 },
    estimatedMinutesSpent: { type: Number, default: 0 },
    lastActivityAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtuals ─────────────────────────────────────────────────────────────

progressSchema.virtual('completionPercent').get(function () {
  if (this.totalLessons === 0) return 0;
  return Math.round((this.completedLessons.length / this.totalLessons) * 100);
});

progressSchema.virtual('isModuleComplete').get(function () {
  return this.completedLessons.length >= this.totalLessons;
});

// ─── Instance Methods ──────────────────────────────────────────────────────

progressSchema.methods.markLessonComplete = function (lessonId, sectionId, moduleId = 'git') {
  const alreadyDone = this.completedLessons.some((l) => l.lessonId === lessonId);
  if (alreadyDone) return false;

  this.completedLessons.push({ lessonId, sectionId, moduleId });
  this.lastActivityAt = new Date();
  this.estimatedMinutesSpent += 6;

  return true;
};

progressSchema.methods.unmarkLesson = function (lessonId) {
  const before = this.completedLessons.length;
  this.completedLessons = this.completedLessons.filter((l) => l.lessonId !== lessonId);
  return this.completedLessons.length < before;
};

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
