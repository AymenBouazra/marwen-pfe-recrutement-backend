const User = require('../models/user');

exports.addCandidatsFromJsonFile = async (req, res) => {
    try {
        await User.insertMany(req.body)
        res.send({ message: 'Candidats added successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getAllCandidats = async (req, res) => {
    try {
        const Candidats = await User.find({ role: 'Candidat' });
        res.json(Candidats)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}