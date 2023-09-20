const mongoose=require("mongoose")

const connectDatabase=()=>{
    try{
        mongoose.connect().then(()=>{
            console.log("database connected successfully")
        }).catch((err)=>console.log("database failed",err))
    }catch(err){
        console.log("Something went wrong",err)
    }
}

module.exports={
    connectDatabase,
}