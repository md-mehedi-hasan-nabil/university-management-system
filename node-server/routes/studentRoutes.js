const express = require('express');
const {
    getStudents,
    getStudent,
    addStudent,
    loginStudent,
    editStudent,
    addSelectedSections,
    removeSelectedSections,
} = require('../controllers/studentController');
const sendEmail = require('../middlewares/sendEmail');
const router = express.Router();

router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/add-student', addStudent, sendEmail);
router.patch('/selected-section', addSelectedSections);
router.patch('/removed-section', removeSelectedSections);
router.post('/login', loginStudent);
router.patch('/:id', editStudent);
router.delete('/:id', removeSelectedSections);

module.exports = router;
