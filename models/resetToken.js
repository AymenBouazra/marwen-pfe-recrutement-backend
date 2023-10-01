const mongoose = require('mongoose')

const ResetTokenSchema = new mongoose.Schema({
    resetToken: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now(), expires: 900 }
},
    {
        timestamps: true, versionKey: false
    })

module.exports = mongoose.model('resetToken', ResetTokenSchema, 'resetToken')