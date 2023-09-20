const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.body.header("frimpmediai-auth-token");
    if(!token) return res.status(401).send("Acess denied,No token available")

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode;
        next()
    }catch(err){
        res.status(400).send("Invalid token")

    }
}

module.exports=auth;