const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken")

const authRouter = express.Router();

authRouter.post('/signup', async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const passHash = await bcrypt.hash(password, 10);
    
        if (!fullName || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const user = new User({ fullName, email, password:passHash });
        await user.save();
    
        res.status(201).json({ message: 'Data saved successfully', user });
      } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
      }
});

authRouter.post("/login", async (req, res) => {
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            return res.send("User not Found");
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(isPasswordMatch){
            
            const token=await jwt.sign({_id:user._id},"QuizApp",{
                expiresIn:"1d"
            });
            res.cookie("token",token)
            res.send(user);
        }
        else{
            return res.send("Incorrect password")
        }
    }catch(error){
        res.json({ error: "Internal server error", message: error.message });

    }
})

module.exports = authRouter;
