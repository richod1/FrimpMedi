const Joi=require("joi")
const bcrypt=requre("bcryptjs")
const { User }=require("../models/User")
const  {ProfileModel}=require("../models/profile")
const {CustomErrorHandler}=require("../services")

const loginController={
    async login(req,res,next){
        const loginSchema=Joi.object({
            email:Joi.string().min(5).required().max(255).email(),
            password:Joi.string().pattern(new RegEx("^[a-zA-Z0-9@._!#-]+$"))
            .min(5).max(1024).required(),
        })

        const {error}=loginSchema.validate(req.body);
        if(error)return next(error)


        let user=await User.findOne({email:req.body.email})
        if(!user)return next(
            CustomErrorHandler.wrongCredentials("you have'nt registed.. signup first")
        );
    
        const validPassword=await bcrypt.compare(req.body.password,user.password);  
        if(!validPassword) return next(CustomErrorHandler.wrongCredentials("Wrong Password"))

        const profile=await ProfileModel.findOne({_id:user.profileID})
        const token=await User.generateAuthToken();

        res.status(200).header("frimpmed-ai-auth-token",token).json({message:"login Success",user:user,profile:profile})
    },
    
    async logout(req,res,next){
        const refreshSchema=Joi.object({
            refresh_token:Joi.string().required(),
        })

        const {error}=refreshSchema.validate(req.body);
        if(error) {
            return next(error)
        }
        try{
            await RefreshToken.deleteOne({token:req.body.token})
        }catch(err){
            return next(new Error("Something went wrong in the database"))

        }
        res.json({code:"Okay"})

    }
    

}

module.exports=loginController;