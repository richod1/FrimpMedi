const mongoose=require("mongoose")
const Joi=require("joi")
const jwt=require("jsonwebtoken")


const UserSchema=new mongoose.Schema({
    name:{type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    username:{
        type:String,
        required:true,
        minLegth:5,
        maxLegth:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        minLegth:5,
        maxLegth:255,
        unique:true,
    },
    password:{type:String,
        required:true,
        minLegth:5,
        maxLenght:1024
    },
    RegisterAs:{type:String,
        default:"Patient",
        required:true
    },
    profileID:{type:String,
        default:null
    },
},{
    timestamps:true
})


UserSchema.method.generateToken=async function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET);
    return token;
}

const User=mongoose.model("User",UserSchema,"frimpMediAI-users")

const validateUser=(user)=>{
    const userSchema=Joi.object({
        name:Joi.string().required().min(3).max(50),
        username:Joi.string().min(4).max(20).required(),
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9@._!#-]+$")).min(5).max(1024).required(),
        repeat_passeord:Joi.ref("password"),
        RegisterAs:Joi.string().required(),
    });
    return userSchema.validate(user)
}

exports.User=User;
exports.validateUser=validateUser;