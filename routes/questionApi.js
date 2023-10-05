const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAllQuestions, getQuestionById, deleteQuestionById, updateQuestionById, createQuestion } = require('../controllers/question.controller');

router.get('/question', passport.authenticate('bearer', { session: false }), getAllQuestions)
router.get('/question/:id', passport.authenticate('bearer', { session: false }), getQuestionById)
router.post('/question', passport.authenticate('bearer', { session: false }), createQuestion)
router.put('/question/:id', passport.authenticate('bearer', { session: false }), updateQuestionById)
router.delete('/question/:id', passport.authenticate('bearer', { session: false }), deleteQuestionById)

module.exports = router