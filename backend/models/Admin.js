const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'admin'
    }
},{
    timestamps:true
}
)

const User=mongoose.model("Admin",adminSchema);

module.exports=User;