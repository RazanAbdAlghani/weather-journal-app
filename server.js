
// Setup empty JS object to act as endpoint for all routes
let projectData = {};


const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});


// GET route that returns the projectData object
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route that adds incoming data to projectData
app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});