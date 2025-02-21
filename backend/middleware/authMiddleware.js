const jwt=require("jsonwebtoken");
const User = require("../models/User");
const Admin=require("../models/Admin");

const authMiddleware=async(req,res,next)=>{

    try{
        const {token}=req.cookies;
        if(!token){
            return res.send("Authentication token not found")
        }

        const decodedObj=await jwt.verify(token,"QuizApp"); //before we can pass id while creating token now we can access id from token

        const {_id}=decodedObj;
        
        let user=await User.findById(_id);
        if(!user){
            return res.send("User not found")
        }
        req.user=user;

        next();

    }catch(err){
        return res.send("Error While fetching data"+err);
     }
}


const adminMiddleware=async(req,res,next)=>{

    // console.log("ala eth parynt",req);
    

    try{
        const {token}=req.cookies;
        if(!token){
            return res.send("Authentication token not found")
        }

        const decodedObj=await jwt.verify(token,"QuizApp");

        const {_id}=decodedObj;
        const {role}=decodedObj;
        console.log(role);
        
        let admin=await Admin.findById(_id);
        if(!admin){
            return res.send("Admin not found")
        }
        req.admin=admin;

        next();

    }catch(err){
        return res.send("Error While fetching data"+err);
     }
}

module.exports={authMiddleware,adminMiddleware};