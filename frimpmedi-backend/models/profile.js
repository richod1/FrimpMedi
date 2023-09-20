const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const Joi=require("joi")

const profileSchema=new mongoose.Schema({
    name:{type:String,required:true,minLegth:2,maxLength:30},
    dob:{type:String,required:true,minLegth:1,maxLength:100},
    gender:{type:String,required:true},
    bloodgrp:{type:String,required:true},
    address:{type:String,required:true},
    medicalhistory:{type:String,required:true},
    allegies:{type:String,minLength:2,maxLegth:1024},
    emergencyContact:{type:String,required:true,minLength:2,maxLegth:30},
    phoneno:{type:String,required:true,validate:{
        validator:function(v){
            return /\d{10}/.test(v);
        },
        message:(props)=>`${props.value} is not a valid phone number!`
    }}

},{
    timestamps:true
})

const Profile=mongoose.model("Profile",profileSchema,"frimpMedAI-profiles")


const validateProfile=(profile)=>{
    const profileSchema=Joi.object({
        name:Joi.string().required().min(2).max(30),
        dob:Joi.string().min(1).max(100).required(),
        gender:Joi.string().required(),
        bloodgrp:Joi.string().required(),
        address:Joi.string().required(),
        medicalhistory:Joi.string().required(),
        allegies:Joi.string().min(2).max(1024),
        emergencyContact:Joi.string().required().min(2).max(30),
        phoneno:Joi.string().pattern(new RegExp("^\\d{10}$")).required(),
    });
    return profileSchema.validate(profile)
}

exports.ProfileModel=Profile;
exports.validateProfile=validateProfile;