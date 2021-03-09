const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: String,
    instructorID: { type: mongoose.ObjectId, ref: 'User' },
    hiringEventID: { type: mongoose.ObjectId, ref: 'HiringEvent' },
    status: String,
    requiredHours: Number,
    questionFile: [Object],
    priority: String,
    rankingFile: [Object],
    applicantResponses: [Object]
}, { timestamps: true });
// [{
//     applicantName: String,
//     applicantEmail: String,
//     instructorRank: Number,
//     applicantRank: Number,
//     gradPrioritization: String,
//     allocationType:String,
//     responses: [{
//         question: String,
//         answer: String,
//     }]
module.exports = Course = mongoose.model('course', CourseSchema);