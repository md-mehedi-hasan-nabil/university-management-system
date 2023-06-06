const mongoose = require('mongoose');
const { Schema } = mongoose;

const authUserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    registeredCourse: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
    },
    selectedSections: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

const authUserModel = mongoose.model('auth', authUserSchema);

module.exports = authUserModel;
