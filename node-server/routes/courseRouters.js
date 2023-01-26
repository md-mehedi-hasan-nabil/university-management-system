const express = require('express');
const {
  getCourses,
  getCourseById,
  addCourse,
  editCourseById,
} = require('../controllers/coursesController');
const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.patch('/:id', editCourseById);
router.post('/', addCourse);

module.exports = router;
