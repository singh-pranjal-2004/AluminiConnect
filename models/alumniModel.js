const mongoose = require('mongoose');
const alumniDbConnection = require('../config/alumniDb');

const alumniSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = alumniDbConnection.model('Alumni', alumniSchema);
