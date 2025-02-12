const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    timer: {
        type: Number, // Time in minutes
        required: true
    }
}, { timestamps: true });

const Quiz=mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;