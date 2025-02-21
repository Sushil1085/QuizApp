const express=require("express");
const { adminMiddleware } = require("../middleware/authMiddleware");
const Quiz = require("../models/Quiz");
const Question=require("../models/Question");
const UserAttempt=require("../models/Score");

const quizRouter = express.Router();


quizRouter.post("/addquiz",adminMiddleware,async(req,res)=>{
    
    try{
    const {title,description,timer}=req.body;

    const quiz=new Quiz({title,description,timer});

    await quiz.save();

    res.json(quiz);
    }catch(err){
        res.send("Error While fetching data"+err);
    }

});

quizRouter.delete("/deletequiz/:quizId", adminMiddleware, async (req, res) => {
  try {
      const { quizId } = req.params;

      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

      if (!deletedQuiz) {
          return res.json({ message: "Quiz not found!" });
      }

      res.json({ message: "Quiz deleted successfully!", deletedQuiz });
  } catch (err) {
      res.json({ message: "Error while deleting quiz", error: err.message });
  }
});

quizRouter.get("/allquiz",async(req,res)=>{
  try{

      const quiz=await Quiz.find({});

      res.json(quiz);
  } catch (error) {
      console.error("Error while adding question:", error);
      res.json({ message: "Failed to add question", error: error.message });
    }
});

quizRouter.post("/addquestion/:quizId",adminMiddleware, async (req, res) => {
    const { questionText, options } = req.body;
    const{quizId}=req.params;
  
    // console.log(quizId);
    
    if (!quizId || !questionText || !options || options.length === 0) {
      return res.json({ message: "Missing required fields (quizId, questionText, options)" });
    }
  
    try {
      const newQuestion = new Question({quizId,questionText,options});
  
      await newQuestion.save();
    // console.log(newQuestion);
    
  
      res.json({ message: "Question added successfully", question: newQuestion });
    } catch (error) {
      console.error("Error while adding question:", error);
      res.json({ message: "Failed to add question", error: error.message });
    }
  });

  quizRouter.delete("/deletequestion/:questionId", adminMiddleware, async (req, res) => {
    try {
        const { questionId } = req.params;

        const deletedQuestion = await Question.findByIdAndDelete(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found!" });
        }

        res.json({ message: "Question deleted successfully!", deletedQuestion });
    } catch (err) {
        res.status(500).json({ message: "Error while deleting question", error: err.message });
    }
});


  quizRouter.get("/allquestions/:quizId",async(req,res)=>{
      const {quizId}=req.params;
    try{

        const questions=await Question.find({quizId}).populate("quizId",["title","description","timer"]);

        res.json(questions);
    } catch (error) {
        console.error("Error while adding question:", error);
        res.json({ message: "Failed to add question", error: error.message });
      }
  });

  quizRouter.post("/submitquiz/:quizId/:userId", async (req, res) => {
    try {
        const { answers } = req.body;
                
        const {userId, quizId}=req.params;
        const questions = await Question.find({ quizId });
        let score = 0;
        let questionResults = [];

        questions.forEach((question) => {
            const userAnswer = answers[question._id];
            const correctOption = question.options.find(option => option.isCorrect);
            const isCorrect = correctOption && userAnswer === correctOption.text;
            
            questionResults.push({
                questionId: question._id,
                selectedOption: userAnswer,
                isCorrect
            });
            
            if (isCorrect) {
                score++;
            }
        });

        const userAttempt = new UserAttempt({
            userId,
            quizId,
            questions: questionResults,
            score
        });
        await userAttempt.save();

        res.json({ message: "Quiz submitted successfully", score, details: questionResults });
    } catch (error) {
        console.error("Error while submitting quiz:", error);
        res.status(500).json({ message: "Failed to submit quiz", error: error.message });
    }
});

quizRouter.get("/scoreboard", async (req, res) => {
    try {
        const {quizId}=req.params;
        const userAttempts = await UserAttempt.find({ }).populate("userId", ["fullName", "email"]).populate("quizId",["title"]).sort({ score: -1 });

        res.json(userAttempts);
    } catch (error) {
        console.error("Error while fetching scoreboard:", error);
        res.status(500).json({ message: "Failed to fetch scoreboard", error: error.message });
    }
});



module.exports=quizRouter;