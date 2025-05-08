const express = require('express');
const router = express.Router();
const  createQuestionModel= require('../models/questions');

router.get('/:subject', async (req, res) => {
  try {

    const{subject,year,topic}=req.params

   const  Question=createQuestionModel(subject,year,topic);


    const questions = await Question.find();
    
    res.json(questions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
