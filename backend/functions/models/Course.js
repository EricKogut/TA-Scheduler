const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: String,
    instructorID: { type: mongoose.ObjectId, ref: 'User' },
    hiringEvent: { type: mongoose.ObjectId, ref: 'HiringEvent' },
    status: String,
    questionFile: [Object],
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

module.exports = Course = mongoose.model('course', CourseSchema);