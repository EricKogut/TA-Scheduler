const express = require('express');
const connectDB = require('./database/connection');


const app = express();


connectDB();

// SAMPLE ROUTE
app.get('/', (req, res)=>{
    res.send("Backend is live!");
});



//PORT CONNECTION 
const Port = process.env.port || 3000;

app.listen(Port, ()=>console.log("Server Started"));