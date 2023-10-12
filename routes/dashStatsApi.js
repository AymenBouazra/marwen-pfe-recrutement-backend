const express = require('express');
const router = express.Router();
const passport = require('passport');
const { stats } = require('../controllers/dashboard.stats.controller');

router.get('/stats', passport.authenticate('bearer', { session: false }), stats)

module.exports = router