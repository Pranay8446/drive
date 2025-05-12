const express = require("express")
const userRouter = require("./routes/user.routes")
const dotenv = require("dotenv")
const { connectToDB, sql } = require("./config/db");
const cookieParser = require("cookie-parser")
const indexRouter = require("./routes/index.routes")





dotenv.config()

connectToDB()


const app = express()


app.set("view engine","ejs")


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",indexRouter)

app.use("/user",userRouter)

app.listen(3000,()=>{
    console.log("server is started")
})