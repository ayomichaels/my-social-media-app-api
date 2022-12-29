const User = require('../models/user')
const Post = require('../models/post')
const passport = require('passport')



const createUser = async (req,res)=>{
    const newUser = await User.create(req.body)
    if (!newUser) {
        return res.status(400).send('Fill all required details')
    }
    res.status(201).json(newUser)
}

const getUser = async (req,res) =>{
    const {id:userID} = req.params
    if (!userID) {
        res.status(400).send('ID not valid, please register')
    }
    const user = await User.find({_id:userID})
    res.status(200).json(user)
}


const getAllUsers = async (req,res)=>{
    //use an auth middleware to authorize only admins 
    const users = await User.find()
    res.status(200).json({nbHits: users.length, users})
}

const updateUser = async (req,res)=>{
    const {id: userID} = req.params
    const user = User.findOneAndUpdate({_id:userID}, req.body, {
        new: true,
        runValidators: true
    })
    user.updatedAt = Date.now
    await user.save()
    
    res.status(200).json(user)
}


const deleteUser = async (req,res)=>{
    const {id:userID} = req.params
    const user = await User.findByIdAndDelete({_id:userID})
    console.log(user);
    if (user) {
        console.log('deleted');
    }
    res.status(200).send('User deleted successfully')
}

//ADMIN PRIVILEGES
const changeRole = async (req,res)=>{
    const {user} = req.body
    const foundUser = await User.findById({_id:user})
    if (!foundUser) {
        return res.status(400).send('USER NOT FOUND, TYPE IN THE CORRECT USERD ID')
    }
    foundUser.role = 'admin'
    foundUser.updatedAt = Date.now()
    await foundUser.save()

    res.status(200).json(foundUser)
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    changeRole
    
}