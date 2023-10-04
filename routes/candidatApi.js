const express = require('express');
const router = express.Router();
const { addCandidatsFromJsonFile, getAllCandidats, deleteOneCandidat } = require('../controllers/candidats.controller');
const passport = require('passport');

router.post('/candidats/addFromJson', passport.authenticate('bearer', { session: false }), addCandidatsFromJsonFile)
router.get('/candidats/getCandidats', passport.authenticate('bearer', { session: false }), getAllCandidats)
router.delete('/candidats/delete/:id', passport.authenticate('bearer', { session: false }), deleteOneCandidat)

module.exports = router
