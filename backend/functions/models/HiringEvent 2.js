const mongoose = require('mongoose');

const HiringEventSchema = new mongoose.Schema({
    courseCode: String,
    instructorID: { type: mongoose.ObjectId, ref: 'User' },
    departmentChairID: { type: mongoose.ObjectId, ref: 'User' },
    startDate: Date,
    endDate: Date,
    status: String,
    questionFile: [Object],
    answerFile: [Object],
    rankingFile: [Object],
    applicantResponses: [{
        applicantName: String,
        applicantEmail: String,
        instructorRank: Number,
        applicantRank: Number,
        responses: [{
            question: String,
            answer: String,
        }],
    }]
}, { timestamps: true });

module.exports = HiringEvent = mongoose.model('hiringEvent', HiringEventSchema);