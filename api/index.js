import express from "express"
import mongoose from 'mongoose'
import dotenv from "dotenv"
import router from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

dotenv.config()
const app = express()

app.use(express.json())
mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Mongodb is connected");
}).catch(err =>{
    console.log("error connecting to mongodb", err);
})
app.listen(3000, () => {  
    console.log("listening on port 3000!!!"); 
})

app.use("/api/user", router)
app.use("/api/auth", authRoute )

app.use((err, req, res, next)=>{
    const statusCode=  err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})