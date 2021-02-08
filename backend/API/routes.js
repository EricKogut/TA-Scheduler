const express = require('express');
const mongoose = require('mongoose');
const Instructor = require('../database/instructor');
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


module.exports = router;