const { default: mongoose } = require('mongoose');
const CourseModel = require('../models/Course');

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

async function addCourse(req, res, next) {
  try {
    const { code, title, credits, faculty, limit, advised } = req.body || {}

    const newCourse = new CourseModel({
      code, title, credits, faculty, limit, advised
    })

    await newCourse.save()

    res.status(201).json({
      data: {
        message: 'Course add successfully.',
      },
    });
  } catch (error) {
    next(error);
  }
}


async function updateCourse(req, res, next) {
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


async function deleteCourse(req, res, next) {
  try {
    const id = req.params.id;
    const course = await CourseModel.deleteOne({ _id: id });
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCourses,
  getCourseById,
  updateCourse,
  addCourse,
  deleteCourse
};
