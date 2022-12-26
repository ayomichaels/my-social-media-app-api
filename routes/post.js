const express = require('express')
const router = express.Router()
const {authorizeUser} = require('../middleware/auth')
const {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
} = require('../controllers/post')

router.route('/all').get(authorizeUser, getAllPosts)
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)
router.route('/create').post(createPost)

module.exports = router