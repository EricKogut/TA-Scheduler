const mongoose = require('mongoose');

const HiringEventSchema = new mongoose.Schema({
    hiringEventName: String,
    departmentChairID: { type: mongoose.ObjectId, ref: 'User' },
    instructors: [{ type: mongoose.ObjectId, ref: 'User' }],
    courses: [{ type: mongoose.ObjectId, ref: 'Course' }],
    startDate: Date,
    endDate: Date,
    status: String,
    rankingFile: [Object],
    answerFile: [Object],
    enrollmentFile: [Object],
    priority: String,
}, { timestamps: true });

module.exports = HiringEvent = mongoose.model('hiringEvent', HiringEventSchema);