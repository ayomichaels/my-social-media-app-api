
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const bcrypt = require('bcrypt')
const userModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: String,
    phone: {type: String, required: true},
    role: {
        type: String,
        default: 'user',
        enum: ['user','admin']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    updatedAt: {
        type: Date,
    }
})


userModel.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

userModel.methods.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}


const User = mongoose.model('user', userModel)

module.exports = User