const { default: mongoose } = require('mongoose');
const CourseModel = require('../models/courseModel');

async function getCourses(req, res, next) {
  try {
    const users = await CourseModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    const user = await CourseModel.findOne({ _id: mongooseId });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function editCourseById(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    const result = await CourseModel.findOneAndUpdate(
      { _id: mongooseId },
      {
        ...req.body,
      }
    );

    console.log(result);
    const user = await CourseModel.findOne({ _id: mongooseId });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function addCourse(req, res, next) {
  try {
    const course = await CourseModel.find({});
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}

// async function editCourse(req, res, next) {
//   try {
//     const course = await CourseModel.findByIdAndUpdate({});
//     res.status(200).json(course);
//   } catch (error) {
//     next(error);
//   }
// }

// async function deleteCourse(req, res, next) {
//   try {
//     const course = await CourseModel.deleteOne({ _id: req.id });
//     res.status(200).json(course);
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  getCourses,
  getCourseById,
  editCourseById,
  addCourse,
};
