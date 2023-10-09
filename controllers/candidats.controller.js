const Formulaire = require('../models/formulaire');
const User = require('../models/user');
const { createTransport } = require('nodemailer');

exports.addCandidatsFromJsonFile = async (req, res) => {
    try {
        await Promise.all(req.body.map(async (candidat) => {
            const transporter = createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            await transporter.sendMail({
                from: `<Marwen Bougossa> ${process.env.EMAIL}`,
                to: candidat.email,
                subject: "Account created ✔",
                html: ` 
                    <b>Account created with:</b>
                    <p>Email: ${candidat.email}</p>
                    <p>Password: 123456</p>
                    <br>
                `,
            });
            await User.create(candidat)
        }))

        res.send({ message: 'Candidats added successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getAllCandidats = async (req, res) => {
    try {
        const Candidats = await User.find({ role: 'Candidat' }).populate('formulaire').populate('reponse');
        res.json(Candidats)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getFormOfCandidat = async (req, res) => {
    try {
        const Candidat = await User.findById(req.params.id);
        if (Candidat) {
            const form = await Formulaire.findById(Candidat.formulaire).populate('questions')
            res.json(form);
        }
        else {
            res.status(404).json("No such Candidat");
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}



exports.deleteOneCandidat = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}