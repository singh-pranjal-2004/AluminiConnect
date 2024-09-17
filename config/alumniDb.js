const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const alumniDbUri = process.env.ALUMNI_DB_URI;

const alumniDbConnection = mongoose.createConnection(alumniDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

alumniDbConnection.on('connected', () => {
    console.log('Alumni Database connected');
});

alumniDbConnection.on('error', (err) => {
    console.error('Alumni Database connection error:', err);
});

module.exports = alumniDbConnection;
