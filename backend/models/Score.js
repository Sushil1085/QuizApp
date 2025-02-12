const mongoose=require("mongoose");
const UserAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questions: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
            selectedOption: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ],
    score: {
        type: Number,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const UserAttempt=mongoose.model('UserAttempt', UserAttemptSchema);

module.exports = UserAttempt;
