// const express = require('express');
// const mongoose = require('mongoose');
// const HiringEvent = require("../models/HiringEvent");
// const Evaluation = require("../models/Evaluation");
// const Instructor = require('../database/instructor');
// const Enrolment = require('../database/enrolment');
// const Course = requite("../models/Course")
// const Processor = require('./processing');
// const { ObjectId } = require( "mongodb");
// const router = express.Router();


// // SAMPLE ROUTE
// router.put('/create/hiringEvent', async(req, res) => {
//     newEvent = {
//         courseCode: req.body.courseCode,
//         instructorID: null,
//         departmentChairID: req.body.departmentChairID,
//         startDate: Date.now(),
//         endDate: null,
//         status: "questionsPending",
//         questionFile: null,
//         answerFile: null,
//         rankingFile: null,
//         applicantResponses: [{
//             applicantName: null,
//             applicantEmail: null,
//             instructorRank: null,
//             applicantRank: null,
//             responses: [{
//                 question: null,
//                 answer: null,
//             }],
//         }]
//     }

//     HiringEvent.create(newEvent).then(event => res.status(200).json(event));
// })


// router.put('/update/hiringEvent/questions', async(req, res) => {
//     HiringEvent.findOneAndUpdate({ _id: req.body._id }, {
//         questionFile: req.body.questions
//     }).then(event => console.log(event));
// })

// router.put('/update/hiringEvent/answers', async(req, res) => {
//     //console.log(req.body, "is the body")
//     await HiringEvent.findOneAndUpdate({ _id: req.body._id }, {
//         answerFile: req.body.answers
//     }).then(event => console.log("success in updating event"));

//     applicantResponses = []

//     req.body.answers.forEach((element, i) => {
//         if (element["Course Code"]) {
//             console.log(i, "is the element")
//             newResponse = {
//                 applicantName: element["Applicant Name"],
//                 applicantEmail: element["applicant email"],
//                 instructorRank: null,
//                 applicantRank: null,
//             }
//             console.log(newResponse)
//             counter = 1;
//             responses = []
//             while (element["Q" + counter]) {
//                 response = {
//                     question: element["Q" + counter],
//                     answer: element["A" + counter],
//                 }
//                 if (!response.answer) {
//                     response.answer = "No answer Provided"
//                 }
//                 responses.push(response)
//                 counter += 1
//             }

//             newResponse.responses = responses
//             counter = 0
//             responses = []
//             applicantResponses.push(newResponse)
//         }


//     })

//     console.log(applicantResponses, "are the applicant responses")
//     await HiringEvent.findOneAndUpdate({ _id: req.body._id }, {
//         applicantResponses: applicantResponses
//     }).then(event => res.status(200).json(event));

// })

// router.put('/update/hiringEvent/ranking', async(req, res) => {
//     HiringEvent.findOneAndUpdate({ _id: req.body._id }, {
//         rankingFile: req.body.answers
//     }).then(event => res.status(200).json(event));
// })

// router.put('/update/hiringEvent/instructorRanking', async(req, res) => {
//     HiringEvent.findOneAndUpdate({ _id: req.body._id }, {
//         applicantResponses: req.body.applicantResponsesUpdated
//     }).then(event => res.status(200).json(event));
// })
// router.get('/get/hiringEvents/:instructorID', (req, res) => {
//     HiringEvent.find({ instructorID: instructorID }).then(event => res.status(200).json(event));
// })

// router.get('/get/hiringEvents/:_id', (req, res) => {
//     HiringEvent.find({ _id: _id }).then(event => res.status(200).json(event));
// })

// router.post('/addEvaluation/questions', async(req,res)=>{

// const evaluationModel = new Evaluation({
//     courseCode: req.body.courseCode,
//     instructorName: req.body.instructorName,
//     questions: req.body.questions

// })

//         try{
//     // saves the user model into the database
//         const evaluationAdded =  await evaluationModel.save();
//         res.json(evaluationAdded);
//         }
//         catch(error){
//             res.json({message: error});
//         }


// })

// //Courses
// router.get('/get/hiringEvents/:_id', (req, res) => {
//     HiringEvent.find({ _id: _id }).then(event => res.status(200).json(event));
// })


// ////////////////////////////////////////////////////////////////
// //COURSES
// ////////////////////////////////////////////////////////////////



// router.get('/courses/getAll/:_id', (req, res) => {
//     console.log(_id, "is what has been passed")
//     Course.find({ hiringEventID: new ObjectId(_id) }).then(event => res.status(200).json(event));
// })


// router.put('/courses/createnew/', (req, res) => {
//     newCourse ={
//         courseCode: req.body.courseCode,
//         instructorID:null,
//         hiringEventID:req.body.hiringEventID,
//         status: "created",
//         questionFile:null,
//         rankingFile:null,
//         applicantResponses:null,
//     }

//     Course.createNew({newCourse}).then(event => res.status(200).json(event));
// })






// // Testing ROUTE
// router.get('/', (req, res) => {
//     res.send("Backend is live!");
// });

// router.get('/test', async(req, res) => {
//     res.status(200).json({ success: true, msg: 'Success: test route works!' })
// });

// router.get('/hiringEvents/getAll', async(req, res) => {
//     HiringEvent.find({}).then(event => res.status(200).json(event))
// });

// //Post instructor on Database 
// router.post('/add/instructor', async(req, res)=>{

//     const instructorModel = new Instructor({
//          name: req.body.name,
//          email: req.body.email,
//          course: req.body.course
//      });
//     try{
//          //save the model in database 
//          const postInstructor = await instructorModel.save();
//         res.json(postInstructor);
//      }
//     catch(error){
//          res.json({message: error});

//      }

    

// });

// router.post('/add/enrolment', async(req, res) => {
//      const enrolmentModel =  new Enrolment({
//           name: req.body.name,
//           file:  req.body.payload,
//      });
     
//      try {
//           const postEnrolment = await enrolmentModel.save();
//           res.json(postEnrolment);

//      } catch (error) {
//           res.json({
//                message: error,
//           });
//      }
// })

// router.get('/download', async(req, res) => {
//     const filename = req.body.name;

//     let processor = new Processor(filename);

//     const sheet = processor.createSheet(); // add data when available

//     res.send(sheet)
// })

module.exports = router;
