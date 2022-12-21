const express = require('express')
const router = express.Router()


const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/user')

router.route('/create').post(createUser)
router.route('/all').get(getAllUsers)
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = router