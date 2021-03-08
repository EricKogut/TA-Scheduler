// mongo stuff
const mongoose = require("mongoose");
const HiringEvent = require("../models/HiringEvent");
const Users = require("../models/Users");
const UsersModel = mongoose.model("users");
const Course = require("../models/Course")

const { ObjectId } = require( "mongodb");

const Matches = require("../models/Matches");
const MatchesModel = mongoose.model("matches");

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


// ----- HIRING EVENT STUFF -------

router.get("/hiringEvent/matches/:course", async (req, res) => {
  console.log(req.params)
  Matches.find({ $or: [{ course: req.params.course, status: "pending"}, { course: req.params.course, status: "confirmed"} ] }).then(
    (doc, err) => {
      console.log(doc)
      res.status(200).json(doc)
    }
  )
  
})

router.get("/hiringEvent/rejectMatch/:name/:course", async (req, res) => {
  console.log(req.params)
  Matches.findOneAndUpdate({ course: req.params.course, name: req.params.name }, { status: "rejected"}).then(
    (doc, err) => {
      console.log(doc)
      res.status(200).json(doc)
    }
  )
  
})


router.get("/hiringEvent/confirmMatch/:name/:course", async (req, res) => {
  console.log(req.params)
  Matches.findOneAndUpdate({ course: req.params.course, name: req.params.name }, { status: "confirmed"}).then(
    (doc, err) => {
      console.log(doc)
      res.status(200).json(doc)
    }
  )
  
})


router.get("/hiringEvent/manualMatch/:name/:course", async (req, res) => {
  console.log(req.params)
  Matches.create({ course: req.params.course, name: req.params.name, status: "confirmed"}).then(
    (doc, err) => {
      console.log(doc)
      res.status(200).json(doc)
    }
  )
  
})




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
        courseCode: element["Course Code"],
        applicantName: element["Applicant Name"],
        applicantEmail: element["applicant email"],
        applicantStatus: element["Applicant status ( 1- Fundable, 2-NotFundable,3-External)"],
        hours: element["5or10 hrs"],
        instructorRank: null,
        applicantRank: element["Course Rank"],
        gradPrioritization: null,
      };
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
      answerFile: applicantResponses,
    }
  ).then((event) => res.status(200).json(event));
});

//PUT for updating TA Hours 
router.put("/update/hiringEvent/hours", async(req,res)=>{

  let enrolmentBody;
  let finalArray = [];

  
  enrolmentBody = req.body.enrollmentInfo;
  let tempObject = {};
  let courses = []
  let hours = [];
  enrolmentBody.forEach((element, i)=>{
   //Getting the coursecode and calculating the hours
    courses.push(element["Course Code"]);
    hours.push(Math.round((element["Previous TA hours"]/element["Previous Enrollments"]) * element["Current Enrollemnts "]).toString());
  })

  for(let i = 0; i < courses.length; i++){
    finalArray.push({courseID:courses[i], TA_hour:hours[i]})
  }
   console.log(finalArray);


   const currentObjectId = new ObjectId(req.body._id);

     HiringEvent.findOneAndUpdate(
     { _id: currentObjectId},
     {
       enrollmentFile: finalArray,
    }
   ).then((event) =>{
    res.status(200).json(event)
    //console.log(event, "is the new event")
   });
  

});



router.put('/courses/update/', (req, res) => {
  hiringEventID = req.body.hiringEventID;
  answerFile = req.body.answerFile;

  //Parsing the answers to only pertain to a single course
  //key: courseCode, value: answers
  courseAnswers = {}

  //Array of courses
  courses = []
  //First Creating all the keys
  answerFile.forEach(answer=>{
    courses[answer.courseCode] =[];
  }) 

  answerFile.forEach(answer=>{
    //console.log(answer, "is the ans")
    courses[answer.courseCode].push(answer);
  }) 

  //Adding the answer files for each course
  Object.keys(courses).forEach(courseCode => {
    console.log("Updating", courseCode, "for", hiringEventID, "here", courses[courseCode])
    Course.findOneAndUpdate({hiringEventID: new ObjectId(hiringEventID), courseCode:courseCode},{applicantResponses:courses[courseCode]}).then(element=>console.log());
  })

  //res.status(200).json({Messange:"yeet"});
})
router.put('/update/course/hours', (req, res) => {
  Course.findOneAndUpdate({_id: new ObjectId(req.body._id)}, {requiredHours:req.body.requiredHours}).then(element=>console.log("updated", req.body._id));
})



router.put('/courses/updatehours/', (req, res) => {
  hiringEventID = req.body.hiringEventID;
  enrollmentFile = req.body.enrollmentFile;
  //console.log(enrollmentFile, "is the enrollmenbt dlsjkfhajsdkl")
 

  //Adding the answer files for each course
  enrollmentFile.forEach(course => {
    console.log("Updating", course.courseID, "for", hiringEventID, "here", course["TA_hour"])
    Course.findOneAndUpdate({hiringEventID: new ObjectId(hiringEventID), courseCode:course.courseID},{requiredHours:course["TA_hour"]}).then(element=>console.log());
  })

  //res.status(200).json({Messange:"yeet"});
})


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
  
  Course.find({ hiringEventID: new ObjectId(req.params._id) }).then(course => res.status(200).json(course));
})

router.get('/courses/getAll/instructorID/:_id', (req, res) => {

  Course.find({ instructorID: new ObjectId(req.params._id) }).then(course => res.status(200).json(course));
})


router.put('/courses/createnew/', (req, res) => {
  newCourse ={
      courseCode: req.body.courseCode,
      instructorID:null,
      hiringEventID:req.body.hiringEventID,
      status: "created",
      requiredHours:null,
      questionFil:null,
      rankingFile:null,
      applicantResponses:null,
  }
  console.log("creating", newCourse)
  Course.create(newCourse).then(course => res.status(200).json(course));
})

