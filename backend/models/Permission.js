const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sheet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sheet', required: true },
  role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' }
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);