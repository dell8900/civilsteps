const mongoose = require("mongoose");

const Authschema = new mongoose.Schema({
 Firstname: { type: String, required: true },
 Lastname: { type: String, required: true },
 Age: { type: Number, required: true },
 Location: { type: String, required: true },
 Gender: { type: String, required: true },
 Noofattempts: { type: Number },
 Email: { type: String, required: true },
 Whatsappno: { type: Number, required: true },
 Mobileno: { type: Number, required: true },
 Password: { type: String, required: true },
 premium: { type: Boolean, default: false },
 level: { type: Number, required: true, default: 1 },
 attempts: [
  {
   level: { type: String },
   questions: [
    {
     questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
     userAnswer: { type: Number, required: true },
     isCorrect: { type: Boolean, required: true },
    },
   ],
   date: { type: String },
   subject: { type: String },
   topic: { type: String },
   correctCount: { type: Number, required: true },
   incorrectCount: { type: Number, required: true },
   passed: { type: Boolean, required: true },
   

  },
 ],
 currentLevel: { type: String }, // Track the current level of the user
});

const UserModel = mongoose.model("Register", Authschema);

module.exports = UserModel;

// const mongoose = require("mongoose");
// const Authschema = new mongoose.Schema({
//   Firstname: { type: String, required: true },
//   Lastname: { type: String, required: true },
//   Age: { type: Number, required: true },
//   Location: { type: String, required: true },
//   Gender: { type: String, required: true },
//   Noofattempts: { type: Number },
//   Email: { type: String, required: true },
//   Whatsappno: { type: Number, required: true },
//   Mobileno: { type: Number, required: true },
//   Password: { type: String, required: true },
//   premium: { type: Boolean, default: false },
//   attempts: [
//     {
//       level: { type: String, required: true },
//       questions: [
//         {
//           questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//           userAnswer: { type: Number, required: true },
//           isCorrect: { type: Boolean, required: true },
//         },
//       ],
//       correctCount: { type: Number, required: true },
//       incorrectCount: { type: Number, required: true },
//       passed: { type: Boolean, required: true },
//     },
//   ],
// });
// const UserModel = mongoose.model("Register", Authschema);

// module.exports = UserModel;
