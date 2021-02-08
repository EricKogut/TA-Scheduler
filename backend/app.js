const express = require('express');
const connectDB = require('./database/connection');
var cors = require('cors');


const app = express();

//Establish database connection 
connectDB();

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




//PORT CONNECTION 
const Port = process.env.port || 3000;

app.listen(Port, () => console.log("Server Started"));