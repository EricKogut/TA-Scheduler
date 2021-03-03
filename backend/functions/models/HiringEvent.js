const mongoose = require('mongoose');

const HiringEventSchema = new mongoose.Schema({
    hiringEventName: String,
    departmentChairID: { type: mongoose.ObjectId, ref: 'User' },
    instructors: [{ type: mongoose.ObjectId, ref: 'User' }],
    courses: [{ type: mongoose.ObjectId, ref: 'Course' }],
    startDate: Date,
    endDate: Date,
    status: String,
    rankingFiles: [Object],
    enrollmentFile: [Object],
}, { timestamps: true });

module.exports = HiringEvent = mongoose.model('hiringEvent', HiringEventSchema);