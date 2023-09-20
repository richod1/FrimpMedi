const _=require("lodash")
const bcrypt=require("bcryptjs")
const {CustomErrorHandler}=require("../services")
const {User,validateUser}=require("../models/User")

const RegisterController={
    async register(req,res,next){
        const {error} =validateUser(req.body)
        if(error)return next(error);

        let user=await User.findOne({email:req.body.email})
        if(user)return next(CustomErrorHandler.alreadyExits("this email already exist"));
        user=await User.findOne({username:req.body.username})
        if(user)return next(CustomErrorHandler.alreadyExits("this username already exist"));

        user=new User(_.pick(req.body,["name","email","username","password","RegisterAs"]));
        const salt=await bcrypt.genSalt();
        user.password=await bcrypt.hash(user.password,salt);
        await user.save();


        if(!user){
            return next(new CustomErrorHandler(402,"User not saved"))
        }

        const token=await User.generateAuthToken()
        console.log(token)

        return res.status(200).header("frimpMedi-Ai-auth-token",token).send({message:"REgistration Successful",user:user})

    }
}


module.exports=RegisterController;