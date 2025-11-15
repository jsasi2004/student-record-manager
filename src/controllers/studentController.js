const Student = require('../models/student');
const studentSchema = require('../validators/studentValidator');

exports.index = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 }).lean();
  res.render('index', { students, messages: req.flash() });
};

exports.newForm = (req, res) => {
  res.render('new', { errors: null, values: {} });
};

exports.create = async (req, res) => {
  try {
    const value = await studentSchema.validateAsync(req.body, { abortEarly: false });
    const student = new Student(value);
    await student.save();
    req.flash('success', 'Student created successfully');
    res.redirect('/');
  } catch (err) {
    if (err.isJoi) {
      const errors = err.details.map((d) => d.message);
      return res.status(400).render('new', { errors, values: req.body });
    }
    if (err.code === 11000) {
      req.flash('error', 'Email already exists');
      return res.redirect('/students/new');
    }
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editForm = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).lean();
  if (!student) return res.status(404).render('404', { message: 'Student not found' });
  res.render('edit', { student, errors: null });
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const value = await studentSchema.validateAsync(req.body, { abortEarly: false });
    await Student.findByIdAndUpdate(id, value);
    req.flash('success', 'Student updated successfully');
    res.redirect('/');
  } catch (err) {
    if (err.isJoi) {
      const errors = err.details.map((d) => d.message);
      return res.status(400).render('edit', { student: { _id: req.params.id, ...req.body }, errors });
    }
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  req.flash('success', 'Student deleted');
  res.redirect('/');
};
