const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
    {
        questionTitle: String,
        questionType: String,
        formulaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'form' }
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('question', QuestionSchema)