const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
 email: {
  type: String,
  required: true,
 },
 token: {
  type: String,
  required: true,
 },
 expiryTime: {
  type: Date,
  required: true,
 },
});

const ResetTokenModel = mongoose.model("ResetToken", resetTokenSchema);

module.exports = { ResetTokenModel };
