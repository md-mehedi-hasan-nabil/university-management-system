const express = require('express');
const {
    getDepartments, getDepartment, addDepartment
} = require('../controllers/departmentController');
const router = express.Router();

router.get('/', getDepartments);
router.get('/:id', getDepartment);
// router.patch('/:id', updateDepartment);
router.post('/', addDepartment);
// router.delete('/:id', deleteDepartment);

module.exports = router;
