const mongoose = require('mongoose');

const AnswersSchema = new mongoose.Schema({
    courseCode: String,
    type: String,
    code: String,
    type: String,
}, { timestamps: true });

module.exports = Code = mongoose.model('code', CodeSchema);