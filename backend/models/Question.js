const { default: mongoose } = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    options: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ]
}, { timestamps: true });

const Question=mongoose.model('Question',QuestionSchema);

module.exports=Question;