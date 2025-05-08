const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
 try {
  await mongoose.connect(
   "mongodb+srv://dellinspiron8900:1234@cluster0.djudhkd.mongodb.net/civilsteps?retryWrites=true&w=majority&appName=Cluster0",
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }
  );
  console.log("Connected to the database successfully");
 } catch (error) {
  console.error("MongoDB connection error:", error.message);
  process.exit(1); // Exit process with failure
 }
};

module.exports = connectDB;
