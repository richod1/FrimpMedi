class CustomErrorHandler{
    constructor (status,msg){
        super()
        this.status= status;
        this.message=msg;
    }

    static alreadyExits(msg){
        return new CustomErrorHandler(409,msg);
    }
    static wrongCredentials(msg="Usaername or Password is wrong"){
        return new CustomErrorHandler(401,msg)
    }
    static unAuthorized(msg="Unauthorised"){
        return new CustomErrorHandler(401,msg)
    }
    static notFound(msg="404 not found"){
        return new CustomErrorHandler(404,msg)
    }
}

module.exports=CustomErrorHandler;