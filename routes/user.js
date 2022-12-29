const express = require('express')
const router = express.Router()
const {authorizeUser} = require('../middleware/auth')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('../passport')

const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    changeRole
} = require('../controllers/user')

// router.post('/login', passport.authenticate('local', {successRedirect: '/protected'}))



router.get('/login', (req,res)=>{
    // res.status(200).send('LOGIN SUCCESSFUL')
    res.render('login')
})


router.route('/create').post(createUser)
router.route('/all').get(authorizeUser, getAllUsers)
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)
router.route('/change-role').post(changeRole)

module.exports = router