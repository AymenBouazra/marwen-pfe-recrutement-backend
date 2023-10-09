const mongoose = require('mongoose')

const EvaluationSchema = new mongoose.Schema(
    {
        candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        formulaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'form' },
        reponseId: { type: mongoose.Schema.Types.ObjectId, ref: 'reponse' },
        note: Number,
        commentaire: String,
        statut: Boolean,
        evaluateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('evaluation', EvaluationSchema)