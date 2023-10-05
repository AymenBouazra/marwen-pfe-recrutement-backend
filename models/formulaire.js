const mongoose = require('mongoose')

const FormulaireSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }]
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('form', FormulaireSchema)