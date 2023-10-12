const Formulaire = require('../models/formulaire');
const User = require('../models/user');
const Question = require('../models/question');
const Reponse = require('../models/reponse');
const Evaluation = require('../models/evaluation');


exports.stats = async (req, res) => {
    try {
        const Candidats = (await User.find({ role: 'Candidat' })).length
        const Consultants = (await User.find({ role: 'Consultant' })).length
        const Evaluateurs = (await User.find({ role: 'Evaluateur' })).length
        const Administrateurs = (await User.find({ role: 'Administrateur' })).length
        const Evaluations = (await Evaluation.find()).length
        const EvaluationsGTE = (await User.find({ note: { $gte: 50 } })).length
        const EvaluationsLT = (await User.find({ note: { $lt: 50 } })).length
        const CandidatsAccepted = (await User.find({ statut: 'Accepted' })).length
        const CandidatsRefused = (await User.find({ statut: 'Refused' })).length
        const CandidatsPassedTest = (await User.find({ testPassed: true })).length
        const CandidatsNotPassedTest = (await User.find({ testPassed: false })).length
        res.json({
            Candidats,
            Consultants,
            Evaluateurs,
            Administrateurs,
            Evaluations,
            EvaluationsGTE,
            EvaluationsLT,
            CandidatsAccepted,
            CandidatsRefused,
            CandidatsPassedTest,
            CandidatsNotPassedTest,
        })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}