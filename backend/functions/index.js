const express = require('express');
var bodyParser = require('body-parser')
const connectDB = require('./database/connection');
var cors = require('cors')
const dotenv = require('dotenv');


dotenv.config();


// FIREBASE STUFF
const admin = require("firebase-admin");
admin.initializeApp();
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

const functions = require("firebase-functions");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })




const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDB();


// connecting to routes.js
const routes = require('./API/routes');
//Adding a callback function to do logging
app.use((req, res, next) => {
    console.log(req.method + " request for " + req.url)
    next()
})

app.use(routes);




//PORT CONNECTION 
// const Port = process.env.port || 3000;

// app.listen(Port, () => console.log("Server Started"));

exports.api = functions.https.onRequest(app);