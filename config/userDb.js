const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userDbUri = process.env.USER_DB_URI;

const userDbConnection = mongoose.createConnection(userDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

userDbConnection.on('connected', () => {
    console.log('User Database connected');
});

userDbConnection.on('error', (err) => {
    console.error('User Database connection error:', err);
});

module.exports = userDbConnection;
