const express = require('express');
const {dbConnect} = require('./config/dbConnect');
const cookieParser = require('cookie-parser');
const cors=require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

const authRouter = require("./routes/authRouter");
const quizRouter= require("./routes/quizRouter");

app.use("/",authRouter);
app.use("/",quizRouter);



dbConnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
