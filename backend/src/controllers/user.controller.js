const { validationResult } = require('express-validator');
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizResult = require('../models/QuizResult');

const getUserById = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Access denied.' });

    const user = await User.findById(req.params.id).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    if (req.user.id !== req.params.id)
      return res.status(403).json({ error: 'Access denied.' });

    const allowed = ['displayName', 'avatar'];
    const updates = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Access denied.' });

    await User.findByIdAndDelete(req.params.id);
    await Progress.findOneAndDelete({ userId: req.params.id });
    await QuizResult.deleteMany({ userId: req.params.id });

    res.clearCookie('devopsbuddy_token');
    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account.' });
  }
};

module.exports = { getUserById, updateUser, deleteUser };
