//Student mongoose schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Student Schema
const StudentSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);


