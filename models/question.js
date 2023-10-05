const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
    {
        questionTitle: String,
        typeQuestion: String
    },
    {
        timestamps: true, versionKey: false
    }
)

module.exports = mongoose.model('question', QuestionSchema, 'question')