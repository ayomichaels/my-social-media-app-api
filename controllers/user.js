const User = require('../models/user')

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
    res.status(400).json(user)
}


const deleteUser = async (req,res)=>{
    const {id:userID} = req.params
    const user = User.findOneAndDelete({_id:userID})
    res.status(200).send('User deleted successfully')
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}