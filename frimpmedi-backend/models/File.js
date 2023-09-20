const mongoose=require("mongoose")


const fileSchema=new mongoose.Schema({
    userID:{type:String,required:true},
    documentName:{type:String,required:true},
    documentDescription:{type:String},
    documentLik:{type:String,unique:true,required:true},
})

const File=mongoose.model("File",fileSchema,"frimpMediAI-documents")
exports.File=File;