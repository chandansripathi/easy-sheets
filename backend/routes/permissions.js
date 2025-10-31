const express = require('express');
const Permission = require('../models/Permission');
const Sheet = require('../models/Sheet');
const auth = require('../middleware/auth');
const router = express.Router();

// Get permissions for a sheet
router.get('/:sheetId', auth, async (req, res) => {
  const permissions = await Permission.find({ sheet: req.params.sheetId }).populate('user', 'username email');
  res.json(permissions);
});

// Add or update permission for a user on a sheet
router.post('/:sheetId', auth, async (req, res) => {
  const { userId, role } = req.body;
  const sheet = await Sheet.findById(req.params.sheetId);
  if (!sheet) return res.status(404).json({ error: 'Sheet not found' });
  if (!sheet.owner.equals(req.user._id))
    return res.status(403).json({ error: 'Only owner can change permissions' });

  let permission = await Permission.findOne({ user: userId, sheet: sheet._id });
  if (permission) {
    permission.role = role;
  } else {
    permission = new Permission({ user: userId, sheet: sheet._id, role });
  }
  await permission.save();
  res.json(permission);
});

module.exports = router;