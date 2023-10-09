const Evaluation = require('../models/evaluation');
const User = require('../models/user');


exports.createEvaluation = async (req, res) => {
    try {
        console.log(req.body);
        await Evaluation.create(req.body);
        await User.findByIdAndUpdate(req.body.candidatId, { note: req.body.note }, { new: true });
        res.json({ message: 'Evaluation created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getOneEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate('candidatId');
        res.json(evaluation)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}
exports.getAllEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.find().populate('candidatId').populate('formulaireId').populate('evaluateurId');
        res.json(evaluation)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.refuserCandidat = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id)
        const candidat = await User.findById(evaluation.candidatId)
        await Evaluation.findByIdAndUpdate(req.params.id, { statut: false }, { new: true })
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
            subject: "Refusé!",
            html: ` 
                <p>
                <b>Bonjour ${candidat.nom.toUpperCase()} ${candidat.prenom}</b>
                Merci pour votre temps et votre intérêt pour notre Société. À l’heure actuelle, nous avons décidé de rechercher d’autres candidats qui correspondent davantage à nos exigences, mais nous tenons à vous remercier de nous donner l’opportunité d’examiner votre candidature.
                </p>
            `,
        });
        res.json({ message: 'Candidat refusé et e-mail de confirmation envoyé!' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.accepterCandidat = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id)
        const candidat = await User.findById(evaluation.candidatId)
        await Evaluation.findByIdAndUpdate(req.params.id, { statut: true }, { new: true })
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
            subject: "Accepté!",
            html: ` 
                <p>
                <b>Bonjour ${candidat.nom.toUpperCase()} ${candidat.prenom}</b>
                Merci pour votre temps et votre intérêt pour notre Société. À l’heure actuelle, nous avons décidé d'accepter votre candidature.
                </p>
            `,
        });
        res.json({ message: 'Candidat accepté et e-mail de confirmation envoyé!' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}