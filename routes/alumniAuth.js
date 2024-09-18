// Code by Pranjal Singh
const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumniModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Alumni signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAlumni = await Alumni.findOne({ email });
        if (existingAlumni) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAlumni = new Alumni({ name, email, password: hashedPassword });
        await newAlumni.save();

        // Generate JWT token after successful signup
        const token = jwt.sign({ email: newAlumni.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error during signup' });
    }
});


// Alumni login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const alumni = await Alumni.findOne({ email });
        if (!alumni || !(await bcrypt.compare(password, alumni.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ email: alumni.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
