// routes/selector.js
const express = require('express');
const router = express.Router();

// Serve the dropdown page
router.get('/', (req, res) => {
    res.render('dropdown');  // Renders the dropdown.ejs view
});

// Handle the dropdown selection
router.post('/select', (req, res) => {
    const userType = req.body.userType;
    if (userType === 'user') {
        res.redirect('/userLoginSignup');  // Redirect to user login/signup
    } else if (userType === 'alumni') {
        res.redirect('/alumniLoginSignup');  // Redirect to alumni login/signup
    } else {
        res.redirect('/');  // If nothing selected, reload the dropdown page
    }
});

module.exports = router;
