const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadImage = require('../common/multer/upload');
const { getAllUsers, getUserById, deleteUserById, updateUserById, createUser } = require('../controllers/user.controller');

router.get('/users', passport.authenticate('bearer', { session: false }), getAllUsers)
router.get('/users/:id', passport.authenticate('bearer', { session: false }), getUserById)
router.post('/users', [passport.authenticate('bearer', { session: false }), uploadImage.single('photo')], createUser)
router.put('/users/:id', [passport.authenticate('bearer', { session: false }), uploadImage.single('photo')], updateUserById)
router.delete('/users/:id', passport.authenticate('bearer', { session: false }), deleteUserById)

module.exports = router