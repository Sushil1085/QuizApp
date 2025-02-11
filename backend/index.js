const express = require('express');
const {dbConnect} = require('./config/dbConnect');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter");

app.use("/",authRouter);



dbConnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
