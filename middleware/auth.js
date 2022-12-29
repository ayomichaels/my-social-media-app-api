// install dependencies - passport, passport-local, connect-mongo, espress-sessions
// configure passport in a different file
// in passport.js write the middleware

const User = require('../models/user')

const authorizeUser = async (req,res,next)=>{
    const {username, password, email} = req.body
    const user = await User.findOne({email:email})
    console.log(user.role);
    if (!user) {
            return res.status(401).send('ACCESS DENIED USER NOT REGISTERED')
        }
    if (user.role!='admin'){
        return res.status(401).send('ACCESS DENIED, ADMIN ACCESS DENIED')
    }

    next()
}

module.exports = {authorizeUser}