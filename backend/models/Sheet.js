const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: Array, default: [] }, // Structure as per your sheet model
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Sheet', sheetSchema);