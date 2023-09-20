const {ValidationError}=require("joi")
const {CustomErrorHandler}=require("../services/CustomErrorHandler")

const errorHandler=(error,req,res,next)=>{
    console.log("error inside the middleware auth",error)
    let statusCode=500;
    let data={
        msg:"Internal server error"
    }

    if(error instanceof ValidationError){
        statusCode=422;
        data={
            msg:error.message
        }
    }
    if(error instanceof CustomErrorHandler){
        statusCode=error.status;
        data={msg:error.message}
    }
    return res.status(statusCode).send(data)
}

module.exports=errorHandler;