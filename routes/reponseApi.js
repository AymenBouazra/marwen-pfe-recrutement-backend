const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createReponse } = require('../controllers/reponse.controller');

router.post('/reponse', passport.authenticate('bearer', { session: false }), createReponse)

module.exports = router