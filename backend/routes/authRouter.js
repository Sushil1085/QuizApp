const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Admin=require("../models/Admin");
const jwt=require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.get('/check',adminMiddleware,async(req,res)=>{

    try {
        const allData = await User.find(); 
        return res.json({ allData });
    } catch (error) {
        res.json({ error: "Internal server error", message: error.message });
    }
})

authRouter.post('/signupuser', async(req, res) => {
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

authRouter.post('/signupadmin', async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const passHash = await bcrypt.hash(password, 10);
    
        if (!fullName || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const admin = new Admin({ fullName, email, password:passHash });
        await admin.save();
    
        res.status(201).json({ message: 'Data saved successfully', admin });
      } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
      }
});

authRouter.post("/login", async (req, res) => {
    try {
        const {email,password}=req.body;

        let user=await User.findOne({email});
        let isAdmin=false;
        if(!user){
            user=await Admin.findOne({email});
            isAdmin=true;
        }
        if(!user){
            return res.json({ message: 'User not found!' });
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(isPasswordMatch){
            
            const token=await jwt.sign({_id:user._id,role:isAdmin ? 'admin':'user'},"QuizApp",{
                expiresIn:"1d"
            });
            res.cookie("token",token)
            res.json({message: 'Login successful!',user});
        }
        else{
            return res.send("Incorrect password")
        }
    }catch(error){
        res.json({ error: "Internal server error", message: error.message });

    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Successfully");
});
module.exports = authRouter;
