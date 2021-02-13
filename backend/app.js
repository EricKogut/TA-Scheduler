const express = require('express');
var bodyParser = require('body-parser')
const connectDB = require('./database/connection');
var cors = require('cors');



var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })




const app = express();

<<<<<<< HEAD
//Establish database connection 
||||||| 05bb6cc
app.use(cors())
=======
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

>>>>>>> main
connectDB();

<<<<<<< HEAD
// app.use are middlewalres which runs everytime when we try to make a request 
app.use(express.json({extesnded: false}));
app.use(cors())


// connecting to routes.js
const routes = require('./API/routes');

app.use('/api', routes);




// SAMPLE ROUTE
app.get('/', (req, res) => {
    res.send("Backend is live!");
});
app.get('/test', (req, res) => {
    res.status(200).json({ success: true, msg: 'Success: test route works!' })
});
||||||| 05bb6cc
// SAMPLE ROUTE
app.get('/', (req, res) => {
    res.send("Backend is live!");
});
app.get('/test', (req, res) => {
    res.status(200).json({ success: true, msg: 'Success: test route works!' })
});
=======

// connecting to routes.js
const routes = require('./API/routes');
//Adding a callback function to do logging
app.use((req, res, next) => {
    console.log(req.method + " request for " + req.url)
    next()
})
app.use('/api', routes);
>>>>>>> main




//PORT CONNECTION 
const Port = process.env.port || 3000;

app.listen(Port, () => console.log("Server Started"));