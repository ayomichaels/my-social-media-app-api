const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('./models/user')

passport.use(new LocalStrategy (
    function(email, password, done) {
        User.findOne({email:email}, (err, user)=>{
            if (err) {return done(err)}
            if (!user) {return done(null, false, {message: 'Incorrect Email'})}
            if (!user.isValidPassword(password)) {return done(null, false, {message: 'Incorrect Password'})}
            
            return done(null, user)

        })
    }
))



passport.serializeUser(function (user, done){
    done(null, user.id)
})

passport.deserializeUser(function (id, done){
    User.findById(id, function (err,user){
        done(err,user)
    })
})