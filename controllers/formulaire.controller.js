const Form = require('../models/formulaire');
exports.getAllForms = async (req, res) => {
    try {
        const Forms = await Form.find().populate('questions');
        res.json(Forms)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('questions');
        res.json(form)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.createForm = async (req, res) => {
    try {
        const formExist = await Form.findOne({ title: req.body.title })
        if (formExist) {
            res.status(400).json({ message: 'Form already exists!' })
        } else {
            await Form.create(req.body);
            res.json({ message: 'Form created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateFormById = async (req, res) => {
    try {
        await Form.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Form updated successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteFormById = async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        res.json({ message: 'Form deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}