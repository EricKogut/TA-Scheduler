const mongoose = require('mongoose');

const HiringEventSchema = new mongoose.Schema({
    courseCode: String,
    instructorID: { type: mongoose.ObjectId, ref: 'User' },
    facultyID: { type: mongoose.ObjectId, ref: 'User' },
    startDate: Date,
    endDate: Date,
    status: String,
    questionFile: Buffer,
    applicantResponses: [{
        applicantName: String,
        applicantEmail: String,
        rank: Number,
        responses: [{
            question: String,
            answer: String,
        }],
    }]
}, { timestamps: true });

module.exports = HiringEvent = mongoose.model('hiringEvent', HiringEventSchema);