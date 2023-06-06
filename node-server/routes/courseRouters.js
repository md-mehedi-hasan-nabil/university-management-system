const express = require('express');
const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/coursesController');
const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.patch('/:id', updateCourse);
router.post('/', addCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
