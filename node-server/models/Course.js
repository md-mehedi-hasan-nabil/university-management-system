const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    code: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    faculty: {
      type: String,
      trim: true,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    advised: {
      type: Number,
      required: true,
      default: 0,
    },
    courseAdvising: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel;
