const express = require('express')
const app = express()
require('dotenv').config()

const {dbConnect} = require('./database/db')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//ROUTERS
app.use('/posts', postRoutes)
app.use('/users', userRoutes)


const PORT = process.env.PORT

dbConnect(process.env.MONGO_URI)
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
})