const { Course, User } = require('../models');

async function listCourses(req, res) {
  const courses = await Course.findAll({ include: [{ model: User, as: 'teacher', attributes: ['id','username','email'] }] });
  res.json(courses);
}

async function getCourse(req, res) {
  const id = req.params.id;
  const course = await Course.findByPk(id, { include: [{ model: User, as: 'teacher', attributes: ['id','username'] }] });
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
}

async function createCourse(req, res) {
  const { title, description } = req.body;
  const teacher_id = req.user.id;
  const c = await Course.create({ title, description, teacher_id });
  res.status(201).json(c);
}

async function updateCourse(req, res) {
  const id = req.params.id;
  const course = await Course.findByPk(id);
  if (!course) return res.status(404).json({ message: 'Not found' });
  // only teacher of course or admin allowed
  if (req.user.role !== 'admin' && course.teacher_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await course.update(req.body);
  res.json(course);
}

async function deleteCourse(req, res) {
  const id = req.params.id;
  const course = await Course.findByPk(id);
  if (!course) return res.status(404).json({ message: 'Not found' });
  if (req.user.role !== 'admin' && course.teacher_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await course.destroy();
  res.json({ message: 'deleted' });
}

module.exports = { listCourses, getCourse, createCourse, updateCourse, deleteCourse };
