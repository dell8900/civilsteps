const { UserAnswerModel } = require('../models/userAnswer');

const userSelectAnswer=async(req,res)=>{
    try {
        const { userId, questionId, selectedOption } = req.body;
        const userAnswer = new UserAnswerModel({ userId, questionId, selectedOption });
        await userAnswer.save();
        res.status(201).send(userAnswer);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
}

const getUserSelectAnswer=async(req,res)=>{
    try {
        const userId = req.params.userId;
        const userAnswers = await UserAnswerModel.find({ userId });
        res.status(200).send(userAnswers);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
}

module.exports ={
    userSelectAnswer,
    getUserSelectAnswer
}
