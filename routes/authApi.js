const express = require('express')
const { register, login, resendCode, confirmAccount, forgetPassword, resetPassword, logout, newCandidatPasswordCreation } = require('../controllers/auth.controller');
const router = express.Router()

router.post('/auth/register', register);
router.post('/auth/login', login);
router.put('/auth/account-confirmation', confirmAccount)
router.put('/auth/resend-code', resendCode)
router.post('/auth/forget-password', forgetPassword)
router.put('/auth/reset-password/:token', resetPassword)
router.put('/auth/new-password/:email', newCandidatPasswordCreation)
router.get('/auth/logout', logout)

module.exports = router;