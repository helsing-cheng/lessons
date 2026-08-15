const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/course');
const { authMiddleware, roleGuard } = require('../middlewares/auth');

router.get('/', ctrl.listCourses);
router.get('/:id', ctrl.getCourse);
router.post('/', authMiddleware, roleGuard(['teacher','admin']), ctrl.createCourse);
router.put('/:id', authMiddleware, ctrl.updateCourse);
router.delete('/:id', authMiddleware, ctrl.deleteCourse);

module.exports = router;
