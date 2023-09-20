const express=require("express")
const app=express()
const cors=require("cors")
const port=3000
const helmet=require("helmet")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const Joi=require("joi")
// joi usage
Joi.objectId=require("joi-objectid")(Joi)
const router=require("./routes")
require("dotenv").config()
const {connectDatabase}=require("./config/connectDatabase")

// express middleres
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))


// dsatabase
// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log("Database connected successfuly")
// }).catch(err=>console.log("Database diconnected!",err))
connectDatabase();


app.get("/",(req,res)=>{
    res.status(201).json({msg:"Welcome to frimpMedi backend"})
})

// api route endpoint
app.use("/api",router);


app.listen(port,(err)=>{
    if(err) throw new Error("server failed")
    console.log(`server is up on port: ${port}`)
})