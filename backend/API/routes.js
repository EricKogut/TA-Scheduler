const express = require('express');
const mongoose = require('mongoose');
const HiringEvent = require("../models/HiringEvent");
const router = express.Router();


// SAMPLE ROUTE
router.put('/create/hiringEvent', async(req, res) => {
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

router.get('/get/hiringEvent/:id', (req, res) => {
    HiringEvent.findOne({ _id: req.params.id }).then(event => res.status(200).json(event));
})

router.get('/get/hiringEvents/:instructorID', (req, res) => {
    HiringEvent.find({ instructorID: instructorID }).then(event => res.status(200).json(event));
})


// Testing ROUTE
router.get('/', (req, res) => {
    res.send("Backend is live!");
});

router.get('/test', async(req, res) => {
    res.status(200).json({ success: true, msg: 'Success: test route works!' })
});

module.exports = router;