const User = require('../models/user');
const Form = require('../models/formulaire');
const { createTransport } = require('nodemailer');
const DASHBOARD_URL_DEV = 'https://marwen-pfe-recrutement-dashboard.vercel.app'
const DASHBOARD_URL_LOCAL = 'https://marwen-pfe-recrutement-dashboard.vercel.app'
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


exports.affectationFormulaireCandidat = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.idUser, { formulaire: req.params.idFormulaire, testPassed: false }, { new: true });
        const user = await User.findById(req.params.idUser)
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: `<Marwen Bougossa> ${process.env.EMAIL}`,
            to: user.email,
            subject: "Test technique",
            html: ` 
                <b>Vous êtes affecter pour faire un test technique:</b>
                <p><a href="${process.env.HOST}/notifications">Cliquer ici</a> pour passer le test technique.</p>
                <br>
            `,
        });
        res.json({ message: 'Form affected to candidat' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}