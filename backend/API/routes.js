const express = require('express');
const mongoose = require('mongoose');
const Instructor = require('../database/instructor');
const Enrolment = require('../database/enrolment');
const router = express.Router();

//Post instructor on Database 
router.post('/add/instructor', async(req, res)=>{

    const instructorModel = new Instructor({
         name: req.body.name,
         email: req.body.email,
         course: req.body.course
     });
    try{
         //save the model in database 
         const postInstructor = await instructorModel.save();
        res.json(postInstructor);
     }
    catch(error){
         res.json({message: error});

     }

    

});

router.post('/add/enrolment', async(req, res) => {
     const enrolmentModel =  new Enrolment({
          name: req.body.name,
          file:  req.body.payload,
     });
     
     try {
          const postEnrolment = await enrolmentModel.save();
          res.json(postEnrolment);

     } catch (error) {
          res.json({
               message: error,
          });
     }
})


module.exports = router;