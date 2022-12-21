const Post = require('../models/post')

const createPost = async (req,res)=>{
    const newPost = await Post.create(req.body)
    res.status(201).json(newPost)
}

const getPost = async(req,res)=>{
    const {id: postID} = req.params
    const post = await Post.find({_id: postID})
    if (!post) {return res.status(400).send('post not found, check the ID')}

    res.status(200).json(post)
}

const getAllPosts = async (req,res)=>{
    const allPosts = await Post.find()
    res.status(200).json({nbHits:allPosts.length, allPosts})
}

const updatePost = async (req,res)=>{
    const {id:postID} = req.params
    const post = await Post.findOneAndUpdate({_id:postID}, req.body, {
        new: true,
        runValidators: true
    } )
    if (!post) {return res.status(400).send('invalid ID, post not found')}

    res.status(200).json('post')
}

const deletePost = async (req,res)=>{
    const {id:postID} = req.params
    const post = await Post.findOneAndDelete({_id:postID})
    if (!post) {return res.status(400).send('invalid ID, post not found')}

    res.status(200).send('post deleted successfully')
}
module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
}