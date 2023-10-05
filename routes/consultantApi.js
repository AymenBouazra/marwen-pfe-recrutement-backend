const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAllConsultants, getConsultantById, deleteConsultantById, updateConsultantById, createConsultant } = require('../controllers/consultantRh.controller');

router.get('/consultant', passport.authenticate('bearer', { session: false }), getAllConsultants)
router.get('/consultant/:id', passport.authenticate('bearer', { session: false }), getConsultantById)
router.post('/consultant', passport.authenticate('bearer', { session: false }), createConsultant)
router.put('/consultant/:id', passport.authenticate('bearer', { session: false }), updateConsultantById)
router.delete('/consultant/:id', passport.authenticate('bearer', { session: false }), deleteConsultantById)

module.exports = router