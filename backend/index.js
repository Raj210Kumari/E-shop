const express = require("express")

const { connection } = require("./config/db")
const {productRoute} = require("./routes/product.route")
const {userRouter} = require("./routes/user.route")
const {authenticate} =require("./middleware/auth.middleware")

const PORT=process.env.port
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("E-Shop Full Stack Web Page")
})
app.post("/login",(req,res)=>{
    res.send("login")
})


app.use("/user",userRouter)
app.use(authenticate)
app.use("/product",productRoute)


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Server is connected to DB")
        console.log("Server is runnig on port 8088")
    } catch (err) {
        console.log("ERROR connecting to DB")
        console.log(err)
    }
})
