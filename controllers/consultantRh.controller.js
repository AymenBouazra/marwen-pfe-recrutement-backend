const Consultant = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getAllConsultants = async (req, res) => {
    try {
        const consultant = await Consultant.find({ role: 'Consultant' });
        res.json(consultant)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getConsultantById = async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.params.id, { password: 0 });
        res.json(consultant)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.createConsultant = async (req, res) => {
    try {
        const consultantExist = await Consultant.findOne({ email: req.body.email })
        if (consultantExist) {
            res.status(400).json({ message: 'Consultant already exists with this e-mail address!' })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await Consultant.create(req.body);
            res.json({ message: 'Consultant created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateConsultantById = async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.params.id);
        if (!req.body.password) {
            req.body.password = consultant.password
        } else {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = hash
        }
        await Consultant.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Consultant updated successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteConsultantById = async (req, res) => {
    try {
        await Consultant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Consultant deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}