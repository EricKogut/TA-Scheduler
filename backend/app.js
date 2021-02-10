const express = require('express');
var bodyParser = require('body-parser')
const connectDB = require('./database/connection');
var cors = require('cors')



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
app.use('/api', routes);




//PORT CONNECTION 
const Port = process.env.port || 3000;

app.listen(Port, () => console.log("Server Started"));