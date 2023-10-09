const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createEvaluation, getOneEvaluation, getAllEvaluation, accepterCandidat, refuserCandidat } = require('../controllers/evaluation.controller');

router.post('/evaluation', [passport.authenticate('bearer', { session: false })], createEvaluation)
router.get('/evaluation/:id', [passport.authenticate('bearer', { session: false })], getOneEvaluation)
router.get('/evaluation', [passport.authenticate('bearer', { session: false })], getAllEvaluation)
router.put('/evaluation/accepter/:id', [passport.authenticate('bearer', { session: false })], accepterCandidat)
router.put('/evaluation/refuser/:id', [passport.authenticate('bearer', { session: false })], refuserCandidat)

module.exports = router