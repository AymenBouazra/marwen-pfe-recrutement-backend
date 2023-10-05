const Evaluateur = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getAllEvaluateurs = async (req, res) => {
    try {
        const evaluateur = await Evaluateur.find({ role: 'Evaluateur' });
        res.json(evaluateur)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getEvaluateurById = async (req, res) => {
    try {
        const evaluateur = await Evaluateur.findById(req.params.id, { password: 0 });
        res.json(evaluateur)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.createEvaluateur = async (req, res) => {
    try {
        const evaluateurExist = await Evaluateur.findOne({ email: req.body.email })
        if (evaluateurExist) {
            res.status(400).json({ message: 'Evaluateur already exists with this e-mail address!' })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await Evaluateur.create(req.body);
            res.json({ message: 'Evaluateur created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateEvaluateurById = async (req, res) => {
    try {
        const evaluateur = await Evaluateur.findById(req.params.id);
        if (!req.body.password) {
            req.body.password = evaluateur.password
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
        }
        await Evaluateur.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Evaluateur updated successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteEvaluateurById = async (req, res) => {
    try {
        await Evaluateur.findByIdAndDelete(req.params.id);
        res.json({ message: 'Evaluateur deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}