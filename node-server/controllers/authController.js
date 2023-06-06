const bcrypt = require('bcrypt');
const AuthUserModel = require('../models/AuthUser');
const CourseModel = require('../models/Course');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
const { default: mongoose } = require('mongoose');

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
    const email = req.body?.email;
    const existUser = await AuthUserModel.findOne({ email });
    if (!existUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new AuthUserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        imageUrl: req.body.imageUrl,
        // maritalStatus: '',
        // bloodGroup: '',
        // religion: '',
        // nationality: '',
      });
      console.log(newUser);

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

async function addStudent(req, res, next) {
  try {
    const { username, email, phone, birthday, gender, address, imageUrl, department } = req.body || {}
    const password = username?.split(" ")?.join("")
    
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
        imageUrl,
        department
      });
      console.log(newUser);

      await newUser.save();

      req.info = {
        email, subject: "Congratulations. You can access in ums dashboard.",
        message: `Hi ${username}!
         You can login to ums dashboard.
         Email: ${email}
         password: ${password}
         

         Thanks you.
         `,
      }

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
    const existUser = await AuthUserModel.findOne({ email: email });

    if (!existUser) {
      res.status(401).json({
        error: {
          message: 'Email or password is wrong',
        },
      });
    } else {
      const validPassword = await bcrypt.compare(password, existUser.password);
      if (validPassword) {
        const userInfo = {
          name: existUser?.username,
          email: existUser?.email,
          phone: existUser?.phone,
          gender: existUser?.gender,
          role: existUser?.role,
        };
        // token generate
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: 3600000
        });

        console.log(token)

        res.status(200).json({
          accessToken: token,
          user: {
            id: existUser?._id,
            name: existUser?.username,
            email: existUser?.email,
            phone: existUser?.phone,
            gender: existUser?.gender,
            role: existUser?.role,
            imageUrl: existUser?.imageUrl,
            selectedSections: existUser?.selectedSections,
            registeredCourse: existUser?.registeredCourse,
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
  addStudent,
  editUser,
  addSelectedSections,
  removeSelectedSections,
};
