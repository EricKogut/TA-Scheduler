const mongoose = require('mongoose');

const enrolment = new mongoose.Schema({ // store previous course enrolments
    name: { // name of chair uploading enrolment
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    file: {
        type: String,
        required: true,
    }, // Base64 representation of the file
});

module.exports = Enrolment = mongoose.model('enrollment', enrolment);