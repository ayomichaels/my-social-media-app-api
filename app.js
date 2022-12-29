const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const {dbConnect} = require('./database/db')

//ROUTES
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

//models
const User = require('./models/user')
const Post = require('./models/post')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//session config
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions-local'
    }),
    cookie : {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//passport initialization
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

//LOGIN
app.post('/login', async (req,res)=>{
    const {email, password} = req.body
    //difference between find() and findOne()
    // using find() I could not access the _id of the user. It returned undefined
    //using findOne() I was able to access the value
    const user = await User.findOne({email:email})
    // console.log(user._id.toString());
    console.log(user);
    const dashboard = await Post.find({user:user._id})
    
    if (dashboard.length === 0) {
        console.log('dashboard empty no activity yet');
        return res.status(200).send('NO POST YET. CREATE A POST')
    }
    res.status(200).json({no_of_posts: dashboard.length, dashboard})
})
//PROTECTED ROUTES
app.get('/protected', (req,res)=>{
    res.status(200).send('PROTECTED')
})

// app.post('/login', passport.authenticate('local', {successRedirect: '/protected'}))

//ROUTERS
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.post('/login', passport.authenticate('local', {successRedirect: '/protected'}))



const PORT = process.env.PORT

dbConnect(process.env.MONGO_URI)
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
})