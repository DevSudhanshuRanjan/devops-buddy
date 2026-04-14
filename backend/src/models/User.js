const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [60, 'Display name cannot exceed 60 characters'],
    },
    avatar: {
      type: String, // URL from Google profile
      default: null,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActivityDate: { type: Date, default: null },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Instance Methods ──────────────────────────────────────────────────────

userSchema.methods.updateStreak = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last = this.streak.lastActivityDate
    ? new Date(this.streak.lastActivityDate)
    : null;

  if (last) {
    last.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return;
    if (diffDays === 1) {
      this.streak.current += 1;
    } else {
      this.streak.current = 1; // streak broken
    }
  } else {
    this.streak.current = 1;
  }

  if (this.streak.current > this.streak.longest) {
    this.streak.longest = this.streak.current;
  }

  this.streak.lastActivityDate = today;
};

// ─── Static Methods ───────────────────────────────────────────────────────

// Find or create user from Google OAuth profile
userSchema.statics.findOrCreateFromGoogle = async function (profile) {
  let user = await this.findOne({ googleId: profile.id });

  if (!user) {
    user = await this.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
      avatar: profile.photos?.[0]?.value || null,
    });
  } else {
    user.lastLoginAt = new Date();
    await user.save();
  }

  return user;
};

userSchema.methods.toPublicJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
