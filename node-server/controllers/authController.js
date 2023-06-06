const bcrypt = require('bcrypt');
const AuthUserModel = require('../models/AuthUser');
const CourseModel = require('../models/Course');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const StudentModel = require('../models/Student');

async function getUser(req, res, next) {
  try {
    const user = await AuthUserModel.find({});
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { username, password, email, phone, birthday, gender, address, imageUrl } = req.body;

    const existUser = await AuthUserModel.findOne({ email });

    if (!existUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new AuthUserModel({
        username,
        email,
        password: hashedPassword,
        phone,
        birthday,
        gender,
        address,
        imageUrl
        // maritalStatus: '',
        // bloodGroup: '',
        // religion: '',
        // nationality: '',
      });

      await newUser.save();

      res.status(201).json({
        data: {
          message: 'Account create successfully.',
        },
      });
    } else {
      res.status(500).json({
        error: {
          message: `Email already in use.`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}


// async function getUserByEmail(req, res, next) {
//   try {
//     const email = req.params.email.split('=')[1];
//     const user = await AuthUserModel.findOne({ email });
//     const data = user?.length === 1 ? user[0] : {};
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// }

async function getUserById(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    const user = await AuthUserModel.find({ _id: mongooseId });
    const data = user?.length === 1 ? user[0] : {};
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const existAdmin = await AuthUserModel.findOne({ email: email });
    const student = await StudentModel.findOne({ email: email });

    if (!existAdmin && !student) {
      res.status(401).json({
        error: {
          message: 'Email or password is wrong',
        },
      });
    } else {
      const user = existAdmin ? existAdmin : student
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const userInfo = {
          name: user?.username,
          email: user?.email,
          phone: user?.phone,
          gender: user?.gender,
          role: user?.role,
        };
        // token generate
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: 3600000
        });

        res.status(200).json({
          accessToken: token,
          user: {
            id: user?._id,
            name: user?.username,
            email: user?.email,
            phone: user?.phone,
            gender: user?.gender,
            role: user?.role,
            imageUrl: user?.imageUrl,
            selectedSections: user?.selectedSections
          },
        });
      } else {
        res.json({
          error: {
            message: 'email or password is incorrect.',
          },
        });
      }
    }
  } catch (error) {
    next();
  }
}

async function editUser(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    res.json(mongooseId);
  } catch (error) { }
}

async function addSelectedSections(req, res, next) {
  try {
    const { userId, courseId, code, title, credits, faculty, limit } = req.body;

    const obj = {
      code,
      title,
      credits,
      faculty,
    };

    const mongooseUserId = mongoose.Types.ObjectId(userId);
    const mongooseCourseId = mongoose.Types.ObjectId(courseId);

    const user = await AuthUserModel.find({ _id: userId }); // user array
    const course = await CourseModel.find({ _id: mongooseCourseId }); // course array

    console.log(user[0]?.selectedSections);

    const totalCredits = user[0]?.selectedSections.reduce(
      (previousValue, currentValue) => currentValue?.credits + previousValue,
      0
    );

    if (totalCredits <= 12) {
      if (limit === 0) {
        res.status().json({
          error: {
            message: 'Section full.',
          },
        });
      } else {
        // update seat limit in course table
        const courseResult = await CourseModel.findOneAndUpdate(
          { _id: mongooseCourseId },
          {
            limit: course[0].limit - 1,
          }
        );

        const courseSelectResult = await AuthUserModel.updateOne(
          { _id: mongooseUserId },
          {
            $push: { selectedSections: obj },
          }
        );
        console.log(courseResult, courseSelectResult);

        if (courseResult?.matchedCount > 0) {
        }

        res.status(201).json({ courseResult, courseSelectResult });
      }
    } else {
      res.status(500).json({
        error: {
          message: 'maximum credits is 12.',
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

async function removeSelectedSections(req, res, next) {
  try {
    const { userId, courseId, code, limit } = req.body;

    console.log(req.body);

    const mongooseUserId = mongoose.Types.ObjectId(userId);
    const mongooseCourseId = mongoose.Types.ObjectId(courseId);

    const user = await AuthUserModel.find({ _id: userId }); // user array
    const course = await CourseModel.find({ _id: mongooseCourseId }); // course array

    console.log(user[0]?.selectedSections);

    if (limit === 0) {
      res.status().json({
        error: {
          message: 'Section full.',
        },
      });
    } else {
      // update seat limit in course table
      const courseResult = await CourseModel.findOneAndUpdate(
        { _id: mongooseCourseId },
        {
          limit: course[0].limit + 1,
        }
      );

      const courseSelectResult = await AuthUserModel.updateOne(
        { _id: mongooseUserId },
        {
          $pull: {
            selectedSections: {
              code,
            },
          },
        }
      );

      console.log(courseSelectResult);

      if (courseResult?.matchedCount > 0) {
      }

      res.status(201).json(courseSelectResult);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getUser,
  loginUser,
  getUserById,
  createUser,
  editUser,
  addSelectedSections,
  removeSelectedSections,
};
