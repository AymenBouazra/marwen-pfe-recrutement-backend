const express = require('express');
const router = express.Router();
const { addCandidatsFromJsonFile, getAllCandidats, deleteOneCandidat } = require('../controllers/candidats.controller');

router.post('/candidats/addFromJson', addCandidatsFromJsonFile)
router.get('/candidats/getCandidats', getAllCandidats)
router.delete('/candidats/delete/:id', deleteOneCandidat)

module.exports = router
