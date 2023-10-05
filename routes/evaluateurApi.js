const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAllEvaluateurs, getEvaluateurById, deleteEvaluateurById, updateEvaluateurById, createEvaluateur } = require('../controllers/evaluateur.controller');

router.get('/evaluateur', passport.authenticate('bearer', { session: false }), getAllEvaluateurs)
router.get('/evaluateur/:id', passport.authenticate('bearer', { session: false }), getEvaluateurById)
router.post('/evaluateur', passport.authenticate('bearer', { session: false }), createEvaluateur)
router.put('/evaluateur/:id', passport.authenticate('bearer', { session: false }), updateEvaluateurById)
router.delete('/evaluateur/:id', passport.authenticate('bearer', { session: false }), deleteEvaluateurById)

module.exports = router