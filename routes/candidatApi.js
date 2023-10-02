const express = require('express');
const router = express.Router();
const { addCandidatsFromJsonFile, getAllCandidats } = require('../controllers/candidats.controller');

router.post('/candidats/addFromJson', addCandidatsFromJsonFile)
router.get('/candidats/getCandidats', getAllCandidats)

module.exports = router
