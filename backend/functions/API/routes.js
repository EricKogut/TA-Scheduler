// mongo stuff
const mongoose = require("mongoose");
const HiringEvent = require("../models/HiringEvent");
const Users = require("../models/Users");
const UsersModel = mongoose.model("users");
const Course = require("../models/Course")

const { ObjectId } = require( "mongodb");

// express stuff
const express = require("express");
const router = express.Router();

// firebase stuff
const admin = require("firebase-admin");

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };


const firebase = require("firebase");


// SAMPLE ROUTE
router.put("/create/hiringEvent", async (req, res) => {
  newEvent = {
    hiringEventName: "New Hiring Event",
    departmentChairID: req.body.departmentChairID,
    instructors: [],
    startDate: Date.now(),
    endDate: null,
    status: "questionsPending",
    rankingFile: null,
    enrollmentFile: null,
  };

  HiringEvent.create(newEvent).then((event) => res.status(200).json(event));
});

// SAMPLE ROUTE
router.put("/create/course", async (req, res) => {
  newEvent = {
    hiringEventName: "New Hiring Event",
    departmentChairID: req.body.departmentChairID,
    instructors: [],
    startDate: Date.now(),
    endDate: null,
    status: "Courses and Questions Pending",
    questionFile: null,
    answerFile: null,
    rankingFile: null,
    applicantResponses: [
      {
        applicantName: null,
        applicantEmail: null,
        instructorRank: null,
        applicantRank: null,
        responses: [
          {
            question: null,
            answer: null,
          },
        ],
      },
    ],
  };

  HiringEvent.create(newEvent).then((event) => res.status(200).json(event));
});

router.put("/update/hiringEvent/questions", async (req, res) => {
  HiringEvent.findOneAndUpdate(
    { _id: req.body._id },
    {
      questionFile: req.body.questions,
    }
  ).then((event) => console.log(event));
});

router.put("/update/hiringEvent/answers", async (req, res) => {
  //console.log(req.body, "is the body")
  await HiringEvent.findOneAndUpdate(
    { _id: req.body._id },
    {
      answerFile: req.body.answers,
    }
  ).then((event) => console.log("success in updating event"));

  applicantResponses = [];

  req.body.answers.forEach((element, i) => {
    if (element["Course Code"]) {
      console.log(i, "is the element");
      newResponse = {
        applicantName: element["Applicant Name"],
        applicantEmail: element["applicant email"],
        instructorRank: null,
        applicantRank: null,
      };
      console.log(newResponse);
      counter = 1;
      responses = [];
      while (element["Q" + counter]) {
        response = {
          question: element["Q" + counter],
          answer: element["A" + counter],
        };
        if (!response.answer) {
          response.answer = "No answer Provided";
        }
        responses.push(response);
        counter += 1;
      }

      newResponse.responses = responses;
      counter = 0;
      responses = [];
      applicantResponses.push(newResponse);
    }
  });

  console.log(applicantResponses, "are the applicant responses");
  await HiringEvent.findOneAndUpdate(
    { _id: req.body._id },
    {
      applicantResponses: applicantResponses,
    }
  ).then((event) => res.status(200).json(event));
});

//PUT for updating TA Hours 
router.put("/update/hiringEvent/hours", async(req,res)=>{

  let enrolmentBody;
  let finalArray = [];

  enrolmentBody = req.body.enrollmentInfo;

  enrolmentBody.forEach((element, i)=>{
    //i starts from 0 and increaments 
    // element is each element within the array we are looping 
    let tempObject = {courseID: "", TA_hour: ""};
    let course = element["Course "];
    let hour = (element["Hrs 2020"]/element["Enrol 2020"]) * element["Enrol 2021"];
    tempObject.courseID = course;
    tempObject.TA_hour = Math.round(hour).toString();
    // if course is defined then put it in the array 
    if(course != undefined){
      finalArray.push(tempObject);
    }
    
  })
   console.log(finalArray);


   const currentObjectId = new ObjectId("60401e61625a9ea848c092bc");

     HiringEvent.findOneAndUpdate(
     { _id: currentObjectId},
     {
       enrollmentFile: finalArray,
    }
   ).then((event) => res.status(200).json(event));
  

});

//GET Ta hours from database 
router.get("/get/tahour/:courseID", async(req,res)=>{

  console.log("pleasee");

 HiringEvent.find({_id: "60401e61625a9ea848c092bc"}).then((event) => res.status(200).json(event));


console.log("Trying to get TA Hours");
/////

});

//Update ta hours 
router.put("/update/hours", async(req,res)=>{
  
  // const hiringevent = HiringEvent.findOne({_id: "60401e61625a9ea848c092bc" })
  const currentObjectId = new ObjectId("60401e61625a9ea848c092bc");
  
 
  const updateTaHour = HiringEvent.updateOne(
    //find the object that coreesponds to this ID
       {_id: currentObjectId},
       //set the TA hour to the hours value attached to the request body
      {$set: {"enrollmentFile.$[elem].TA_hour": req.body.hours} },
      //the condition to change the TA_hour is that the coursecode must match the corse code attached in the request body
      {arrayFilters: [{"elem.courseID": req.body.courseCode}]}
  ).then((event) => res.status(200).json(event));
   console.log("done changing TA_hour");

});

router.put("/update/hiringEvent/ranking", async (req, res) => {
  HiringEvent.findOneAndUpdate(
    { _id: req.body._id },
    {
      rankingFile: req.body.answers,
    }
  ).then((event) => res.status(200).json(event));
});

router.put("/update/hiringEvent/instructorRanking", async (req, res) => {
  HiringEvent.findOneAndUpdate(
    { _id: req.body._id },
    {
      applicantResponses: req.body.applicantResponsesUpdated,
    }
  ).then((event) => res.status(200).json(event));
});
// router.get("/get/hiringEvents/:instructorID", (req, res) => {
//   HiringEvent.find({ instructorID: instructorID }).then((event) =>
//     res.status(200).json(event)
//   );
// });

router.get("/get/hiringEvents/:_id", (req, res) => {
  HiringEvent.find({ _id: _id }).then((event) => res.status(200).json(event));
});

router.get("/get/chairHiringEvents/:departmentChairId", (req, res) => {
  console.log("getting");
  const currentObjectId = new ObjectId(req.params.departmentChairId)
  console.log(currentObjectId)
  HiringEvent.find({ departmentChairID: currentObjectId }).then((event) => res.status(200).json(event));
});
// auth

const authMid = (req, res, next) => {
    // make sure a token is recieved
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.error("no token");
      return res.status(403).json({ error: "unauthorized" });
    }
  
    // authorize token
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
  
        UsersModel.findOne({ userID: decodedToken.uid }, (err, doc) => {
          if (doc) {
            console.log("here");
  
            return next();
          } else {
            return res.status(404).send("no thing with that name");
          }
        });
      })
  
      .catch((err) => {
        console.error("Error while varifying token", err);
        return res.status(403).json(err);
      });
  };


router.post("/signup", async (req, res) => {
  // vars
  let password = req.body.password;
  let email = req.body.email;
  let role = req.body.role;
  let name = req.body.name;

  let userID;
  let JWT;

  // - check if passwords match
  if (req.password != req.passwordConfirm) {
    console.log(req.password);
    return res.status(422).send("passwords don't match");
  }

  // - check if email exists
  // - sign up and return token
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(`SIGNED UP ${data.user.uid}`);
      userID = data.user.uid;

      return data.user.getIdToken();
    })
    .then((token) => {
      JWT = token;
      // return res.status(201).send(token);
      console.log(userID);

      const newUser = new UsersModel({
        email: email,
        name: name,
        userID: userID,
        role: role,
      });

      // save user to db and return token
      newUser
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({ token: token, role: role });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
});



router.post("/login", async(req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        UsersModel.findOne({ email: user.email }, (err, doc) => {
            if (doc) {
              console.log(doc);
    

    
              return res.json({  token: token, role: doc.role  });
            } else {
              return res.status(404).send("no schedule with that name");
            }
          });

        
      })
      .catch((err) => {
        console.error(err);
  
        return res.status(403).send(err);
      });
  });

// Testing ROUTE
router.get("/", (req, res) => {
  res.send("Backend is live!");
});

router.get("/test", async (req, res) => {
  res.status(200).json({ success: true, msg: "Success: test route works!" });
});

router.get("/hiringEvents/getAll", async (req, res) => {
  HiringEvent.find({}).then((event) => res.status(200).json(event));
});

module.exports = router;

// hey there, its ok, you'll fix that bug soon, you deserve a break rn - go





///////////////////////////////////////////////////////////////////////////////
//

router.get('/courses/getAll/:_id', (req, res) => {
  console.log(_id, "is what has been passed")
  Course.find({ hiringEventID: new ObjectId(_id) }).then(event => res.status(200).json(event));
})


router.put('/courses/createnew/', (req, res) => {
  newCourse ={
      courseCode: req.body.courseCode,
      instructorID:null,
      hiringEventID:req.body.hiringEventID,
      status: "created",
      questionFile:null,
      rankingFile:null,
      applicantResponses:null,
  }
  console.log("creating", newCourse)
  Course.create(newCourse).then(event => res.status(200).json(event));
})

