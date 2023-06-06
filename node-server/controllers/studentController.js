const bcrypt = require('bcrypt');
const StudentModel = require('../models/Student');
const CourseModel = require('../models/Course');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

async function getStudents(req, res, next) {
  try {
    const user = await StudentModel.find({});
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function addStudent(req, res, next) {
  try {
    const { username, email, phone, birthday, gender, address, imageUrl, department } = req.body || {}
    const password = username?.split(" ")?.join("")

    const existStudent = await StudentModel.findOne({ email });

    if (!existStudent) {
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("password: ", password)
      console.log("hashedPassword: ", hashedPassword)

      const newStudent = new StudentModel({
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

      await newStudent.save();

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

async function getStudent(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    const user = await StudentModel.findOne({ _id: mongooseId })
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function loginStudent(req, res, next) {
  try {
    const { email, password } = req.body;
    const existUser = await StudentModel.findOne({ email: email });

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

async function editStudent(req, res, next) {
  try {
    const id = req.params.id;
    const mongooseId = mongoose.Types.ObjectId(id);
    res.json(mongooseId);
  } catch (error) { }
}

async function addSelectedSections(req, res, next) {
  try {
    const { userId, courseId } = req.body || {}

    // student information that is object
    const student = await StudentModel.findOne({ _id: userId });
    const course = await CourseModel.findOne({ _id: courseId });

    // console.log(student.totalCredits)

    if (student.totalCredits + course.credits <= 60) {
      if (course?.limit === 0) {
        res.status().json({
          error: {
            message: 'Section full.',
          },
        });
      } else {
        // update seat limit in course table
        const courseResult = await CourseModel.findOneAndUpdate(
          { _id: courseId },
          {
            limit: course.limit - 1,
          }
        );

        const courseSelectResult = await StudentModel.updateOne(
          { _id: userId },
          {
            $push: { selectedSections: courseId },
          }
        );
        // console.log(student.totalCredits)

        // update credits
        await StudentModel.findByIdAndUpdate(userId, {
          totalCredits: student.totalCredits + course.credits
        })

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
    const { userId, courseId } = req.body || {}

    // student information that is object
    const student = await StudentModel.findOne({ _id: userId });
    const course = await CourseModel.findOne({ _id: courseId });

    console.log(student.totalCredits)
    console.log(course.credits)


    // update seat limit in course table
    const courseResult = await CourseModel.findOneAndUpdate(
      { _id: courseId },
      {
        limit: course.limit + 1,
      }
    );

    const courseSelectResult = await StudentModel.updateOne(
      { _id: userId },
      {
        $pull: { selectedSections: courseId },
      }
    );
    
    // update credits
    const credits = (student.totalCredits - course.credits) < 0 ? 0 : student.totalCredits - course.credits;
    await StudentModel.findByIdAndUpdate(userId, {
      totalCredits: credits
    })

    if (courseResult?.matchedCount > 0) {
    }

    res.status(201).json({ courseResult, courseSelectResult });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  loginStudent,
  editStudent,
  addSelectedSections,
  removeSelectedSections,
};
