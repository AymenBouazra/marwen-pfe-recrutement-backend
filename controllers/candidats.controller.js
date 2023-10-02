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
                from: `"Aymen Boauzra" ${process.env.EMAIL}`,
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
        const Candidats = await User.find({ role: 'Candidat' });
        res.json(Candidats)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}