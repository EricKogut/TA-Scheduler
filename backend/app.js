const express = require('express');
var bodyParser = require('body-parser')
const connectDB = require('./database/connection');
var cors = require('cors')

//Importing models
const HiringEvent = require("./models/HiringEvent")

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })




const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDB();



// SAMPLE ROUTE
app.put('/create/hiringEvent', (req, res) => {
    console.log(req.body, "is the body")
    newEvent = {
        courseCode: req.body.courseCode,
        instructorID: req.body.instructorID,
        facultyID: null,
        startDate: Date.now(),
        endDate: null,
        status: "questionsPending",
        questionFile: null,
        applicantResponses: [{
            applicantName: null,
            applicantEmail: null,
            rank: null,
            responses: [{
                question: null,
                answer: null,
            }],
        }]
    }
    HiringEvent.create(newEvent).then(event => res.status(200).json(event));
})

app.get('/get/hiringEvent/:id', (req, res) => {
    HiringEvent.findOne({ _id: req.params.id }).then(event => res.status(200).json(event));
})

app.get('/get/hiringEvents/:instructorID', (req, res) => {
    HiringEvent.find({ instructorID: instructorID }).then(event => res.status(200).json(event));
})


// SAMPLE ROUTE
app.get('/', (req, res) => {
    res.send("Backend is live!");
});

app.get('/test', (req, res) => {
    res.status(200).json({ success: true, msg: 'Success: test route works!' })
});




//PORT CONNECTION 
const Port = process.env.port || 3000;

app.listen(Port, () => console.log("Server Started"));