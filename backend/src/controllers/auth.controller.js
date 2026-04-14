const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');

const issueToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const sendTokenCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('devopsbuddy_token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    // Update streak
    user.updateStreak();
    await user.save();

    // Ensure Progress document exists for this user
    await Progress.findOneAndUpdate(
      { userId: user._id },
      { $setOnInsert: { userId: user._id, moduleId: 'git' } },
      { upsert: true, new: true }
    );

    const token = issueToken(user._id);
    sendTokenCookie(res, token);

    // Redirect to frontend — frontend stores the token from query param
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const logout = (req, res) => {
  res.clearCookie('devopsbuddy_token');
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { googleCallback, getMe, logout };
