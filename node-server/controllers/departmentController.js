const DepartmentModel = require("../models/Department")
const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/Course");

async function getDepartments(req, res, next) {
    try {
        const departments = await DepartmentModel.find({})
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
}

async function getDepartment(req, res, next) {
    try {
        const id = req.params.id;
        const mongooseId = mongoose.Types.ObjectId(id);
        const department = await CourseModel.findOne({ _id: mongooseId });
        res.status(200).json(department);
    } catch (error) {
        next(error);
    }
}

async function addDepartment(req, res, next) {
    try {
        const { name, code } = req.body || {}

        const existDepartment = await DepartmentModel.findOne({ name });

        if (!existDepartment) {
            const newDepartment = new DepartmentModel({
                name, code
            })

            await newDepartment.save()

            res.status(201).json({
                data: {
                    message: 'Department create successfully.',
                },
            });

        } else {
            res.status(500).json({
                data: {
                    message: 'Department already exist.',
                },
            });
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDepartments, getDepartment, addDepartment
}