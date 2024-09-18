const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const selectorRoutes = require('./routes/selector');
const authenticateToken = require('./middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const path = require('path');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/selector')); // Add a route to handle redirection based on selection

app.use('/user', require('./routes/userAuth'));
app.use('/alumni', require('./routes/alumniAuth'));

// Views routes
app.use('/', selectorRoutes);  // Use the dropdown route at '/'

app.get('/userLoginSignup', (req, res) => {
    res.render('userLoginSignup'); // Make sure the view aluminiLoginSignup.ejs exists
});

app.get('/alumniLoginSignup', (req, res) => {
    res.render('alumniLoginSignup'); // Make sure the view aluminiLoginSignup.ejs exists
});

app.get('/addmoredetails', authenticateToken, (req, res) => {
    res.render('addmoredetails');
});

app.get('/home', authenticateToken, (req, res) => {
    res.render('studentDashboard');
});

app.get('/profile', authenticateToken, (req, res) => {
    res.render('profile');
});

app.get('/friends', authenticateToken, (req, res) => {
    res.render('friends');
});

app.get('/form', (req, res) => {
    res.redirect('http://127.0.0.1:5000');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
