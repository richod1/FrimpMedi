const express=require("express")
const router=express.Router()
const {RegisterController}=require("../controllers/registerController")
const {loginController}=require("../controllers/loginController")
const {profileController}=require("../controllers/profileController")


// auth routes
router.post("/signup",RegisterController)

// login routes
router.post("/login",loginController)

// uer profile
router.get("/user/profile",profileController,)



module.exports=router;