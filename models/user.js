const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    adresse: String,
    phone: String,
    education: String,
    diplome: String,
    experience: String,
    competence: String,
    role: String,
    confirmationCode: String,
    confirmed: { type: Boolean, default: false },
    noPassword: Boolean
},
    {
        timestamps: true, versionKey: false
    })

module.exports = mongoose.model('User', UserSchema, 'User')