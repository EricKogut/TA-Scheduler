const express = require('express');
const connectDB = require('./database/connection');
var cors = require('cors')


const app = express();

app.use(cors())
connectDB();

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