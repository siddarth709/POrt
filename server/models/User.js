const mongoose = require('mongoose');

// Only ONE document should ever exist in this collection - the single site owner.
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hash
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
