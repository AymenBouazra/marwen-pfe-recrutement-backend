const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAllForms, getFormById, deleteFormById, updateFormById, createForm, affectationFormulaireCandidat } = require('../controllers/formulaire.controller');

router.get('/form', passport.authenticate('bearer', { session: false }), getAllForms)
router.get('/form/:id', passport.authenticate('bearer', { session: false }), getFormById)
router.post('/form', passport.authenticate('bearer', { session: false }), createForm)
router.put('/form/:id', passport.authenticate('bearer', { session: false }), updateFormById)
router.delete('/form/:id', passport.authenticate('bearer', { session: false }), deleteFormById)
router.get('/affectFormToCandidat/:idUser/:idFormulaire', passport.authenticate('bearer', { session: false }), affectationFormulaireCandidat)


module.exports = router