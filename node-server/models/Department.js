const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        code: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const departmentModel = mongoose.model('department', departmentSchema);

module.exports = departmentModel;
