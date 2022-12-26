const Post = require('../models/post')

const createPost = async (req,res)=>{
    const {user, title, body} = req.body
    const newPost = await Post.create(req.body)
    // const newPost = new Post({
    //     user: user,
    //     title,
    //     body,
    
    // })
    // const createdPost = await newPost.save()
    // res.status(201).json(createdPost)
    res.status(201).json(newPost)

}

const getPost = async(req,res)=>{
    const {id: postID} = req.params
    const post = await Post.findById({_id: postID})
    
    //fix this
    post.views+=1
    const viewed_post = await post.save()//save can be used when you use findById, it won't work for just find
    if (!post) {return res.status(400).send('post not found, check the ID')}
    res.status(200).json(viewed_post)
    
    // res.status(200).json(post)
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
    console.log('update made successfully');

    res.status(200).json(post)
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