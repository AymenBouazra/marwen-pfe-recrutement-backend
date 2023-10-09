const Reponse = require('../models/reponse');
const User = require('../models/user');


exports.createReponse = async (req, res) => {
    try {
        let videoPaths = []
        let questionNames = JSON.parse(req.body.videoQuestions)
        if (req.files) {
            await Promise.all(req.files?.map((v, index) => {
                videoPaths.push({ path: process.env.BACKEND_HOST + v.path, question: questionNames[index] })
            }));
        }
        const parsedBody = {
            reponses: JSON.parse(req.body.reponses),
            videoPaths,
            candidatId: req.body.candidatId,
            formulaireId: req.body.formulaireId
        }
        const reponse = await Reponse.create(parsedBody);
        await User.findByIdAndUpdate(req.body.candidatId, { reponse: reponse._id, testPassed: true }, { new: true });
        res.json({ message: "Test passé" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getOneReponse = async (req, res) => {
    try {
        const reponse = await Reponse.findById(req.params.id).populate('candidatId');
        res.json(reponse)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}