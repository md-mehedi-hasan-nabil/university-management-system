const express = require('express');
const {
  getUser,
  createUser,
  addStudent,
  loginUser,
  addSelectedSections,
  editUser,
  removeSelectedSections,
  getUserById,
} = require('../controllers/authController');
const sendEmail = require('../middlewares/sendEmail');
const router = express.Router();

router.get('/register', getUser);
router.get('/register/:id', getUserById);
router.post('/register', createUser);
router.post('/add-student', addStudent, sendEmail);
router.post('/register/:id', addSelectedSections);
router.post('/login', loginUser);
router.patch('/register/:id', editUser);
router.delete('/register/:id', removeSelectedSections);

module.exports = router;
