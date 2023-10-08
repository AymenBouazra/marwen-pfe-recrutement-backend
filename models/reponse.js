const mongoose = require('mongoose')

const ReponseSchema = new mongoose.Schema(
    {
        candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        formulaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'form' },
        reponses: []
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('reponse', ReponseSchema)