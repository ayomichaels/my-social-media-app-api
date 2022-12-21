const express = require('express')
const router = express.Router()

const {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
} = require('../controllers/post')

router.route('/all').get(getAllPosts)
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)
router.route('/create').post(createPost)

module.exports = router