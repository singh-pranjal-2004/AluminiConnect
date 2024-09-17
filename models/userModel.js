const mongoose = require('mongoose');
const userDbConnection = require('../config/userDb');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = userDbConnection.model('User', userSchema);
