const Question = require('../models/question');
const Form = require('../models/formulaire');
exports.getAllQuestions = async (req, res) => {
    try {
        const Questions = await Question.find();
        res.json(Questions)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id, { password: 0 });
        res.json(question)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.createQuestion = async (req, res) => {
    try {
        const questionExist = await Question.findOne({ questionTitle: req.body.questionTitle })
        if (questionExist) {
            res.status(400).json({ message: 'Question already exists!' })
        } else {
            const question = await Question.create(req.body);
            await Form.findByIdAndUpdate(req.body.formulaireId, { $push: { questions: question._id } }, { new: true });
            res.json({ message: 'Question created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateQuestionById = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Question updated successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteQuestionById = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}