const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    image: {type: String, required: false},
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    views: {
        type : Number,
        default: 0
    },
    likes: {
        type : Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Posts', postModel)

module.exports = Post