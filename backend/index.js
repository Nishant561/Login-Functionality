const express = require('express')
const cors = require('cors')
const userRouter = require('./src/routes/userRoutes/userRouter')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api' ,userRouter)




app.use((error , request , response , next)=>{
    statusCode = error.statusCode || 500
    message= error.message || "somet"
    return response.status( statusCode).json({
        success:false,
        statusCode,
        message:error.message || "something went wrong",
        stackTrace:error.stackTrace
    })
})

module.exports = app