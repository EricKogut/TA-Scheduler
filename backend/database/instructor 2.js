const mongoose = require('mongoose');


// creating an instructor model by defining schema
// this is the format in which our data would be stored into the mongodb database


const instructor = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    course: {
        type: String
    }
});


//(schema name, collection name)
module.exports = Instructor = mongoose.model('instructor', instructor);