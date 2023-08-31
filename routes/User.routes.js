const express = require('express')
const router = express.Router()
const {signup, getUsers, updateUser, deleteUser, login, getUserById} = require('../controlers/User.controlers')
const auth = require('../middlewares/auth')


router.get('/', getUsers)
router.post('/', signup)
router.put('/', updateUser)
router.delete('/', deleteUser)
router.post('/login', login)
router.get('/:_id',auth, getUserById)

module.exports = router