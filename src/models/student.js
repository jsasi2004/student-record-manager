const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 100 },
  lastName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  course: { type: String, required: true, trim: true },
  marks: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
