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

quizRouter.get("/allquiz",adminMiddleware,async(req,res)=>{
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
      const newQuestion = new Question({
        quizId,         
        questionText,   
        options         
      });
  
      await newQuestion.save();
    // console.log(newQuestion);
    
  
      res.json({ message: "Question added successfully", question: newQuestion });
    } catch (error) {
      console.error("Error while adding question:", error);
      res.json({ message: "Failed to add question", error: error.message });
    }
  });

  quizRouter.get("/allquestions",async(req,res)=>{
    try{

        const questions=await Question.find({}).populate("quizId",["title","description","timer"]);

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


module.exports=quizRouter;