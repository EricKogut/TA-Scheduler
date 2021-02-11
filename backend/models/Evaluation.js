const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    courseCode: String,
    instructorName: String,
    questions: Array
});

module.exports = Evaluation = mongoose.model('evaluation', evaluationSchema);