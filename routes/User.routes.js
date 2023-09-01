const express = require('express')
const router = express.Router()
const {signup, getUsers, updateUser, deleteUser, login, getUserById} = require('../controlers/User.controlers')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')


router.get('/', getUsers)
router.post('/', signup)
router.put('/', updateUser)
router.delete('/', deleteUser)
router.post('/login', login)
router.get('/:_id',auth, getUserById)
router.get('/admin/users', isAdmin, getUsers);
router.put('/admin/users/:_id', isAdmin, updateUser);
router.delete('/admin/users/:_id', isAdmin, deleteUser);

module.exports = router