const Reponse = require('../models/question');
const Form = require('../models/formulaire');
const User = require('../models/user');


exports.createReponse = async (req, res) => {
    try {
        const reponse = await Reponse.create(req.body);
        await Form.findByIdAndUpdate(req.body.formulaireId, { $push: { reponses: reponse._id } }, { new: true });
        await User.findByIdAndUpdate(req.user_id, { $push: { candidatId: req.user._id } }, { new: true });
        res.json({ message: 'Reponse created successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}