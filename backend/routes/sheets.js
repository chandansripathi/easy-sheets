const express = require('express');
const Sheet = require('../models/Sheet');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all sheets (owned or collaborated)
router.get('/', auth, async (req, res) => {
  const sheets = await Sheet.find({ $or: [{ owner: req.user._id }, { collaborators: req.user._id }] });
  res.json(sheets);
});

// Create new sheet
router.post('/', auth, async (req, res) => {
  const { title, data } = req.body;
  const sheet = new Sheet({ title, data, owner: req.user._id });
  await sheet.save();
  res.status(201).json(sheet);
});

// Get single sheet
router.get('/:id', auth, async (req, res) => {
  const sheet = await Sheet.findById(req.params.id);
  if (!sheet) return res.status(404).json({ error: 'Sheet not found' });
  if (!sheet.owner.equals(req.user._id) && !sheet.collaborators.includes(req.user._id))
    return res.status(403).json({ error: 'No access' });
  res.json(sheet);
});

// Save/update sheet
router.post('/:id/save', auth, async (req, res) => {
  const { data } = req.body;
  const sheet = await Sheet.findById(req.params.id);
  if (!sheet) return res.status(404).json({ error: 'Sheet not found' });
  if (!sheet.owner.equals(req.user._id) && !sheet.collaborators.includes(req.user._id))
    return res.status(403).json({ error: 'No access' });
  sheet.data = data;
  await sheet.save();
  res.json(sheet);
});

module.exports = router;