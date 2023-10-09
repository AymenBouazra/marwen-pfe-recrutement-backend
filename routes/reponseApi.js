const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createReponse, getOneReponse } = require('../controllers/reponse.controller');
const upload = require('../common/multer/upload');

router.post('/reponse', [passport.authenticate('bearer', { session: false }), upload.array('videos')], createReponse)
router.get('/reponse/:id', [passport.authenticate('bearer', { session: false }), upload.array('videos')], getOneReponse)

module.exports = router