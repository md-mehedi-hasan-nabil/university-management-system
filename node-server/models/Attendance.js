const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    student: {
        type: [Schema.Types.ObjectId],
        ref: "auth",
        required: true
    },
    status: {
        type: Boolean,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "course",
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
}, { timestamps: true, }
);

const attendanceModel = mongoose.model('attendance', attendanceSchema);

module.exports = attendanceModel;
