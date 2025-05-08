const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const fetchtopicquestion = require("./routes/fetchtopicquestion");

const score = require("./routes/result");
const app = express();
// const cors = require('cors');

app.use(
 cors({
  origin: "*", // your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
 })
);

dotenv.config();
app.use(bodyParser.json());

const questionsRoutes = require("./routes/questions");
const fetchquestionsRoute = require("./routes/fetchquestions");
const connectDB = require("./db/config");
const { userRouter } = require("./route/user.routes");
const { userAnswerRoutes } = require("./route/userAnswer.routes");
const getQuestionBySubjectAndTopicRouter = require("./route/getQuestionBySubjectAndTopic.Routes");
const subjectRouter = require("./route/subject.routes");
const subjectRoutes = require("./route/addSubject.routes");
const yearRoutes = require("./route/addyear.routes");
const year_based_route = require("./route/year.routes");
const subAndTopicAddRoutes = require("./route/subjectAndTopic.routes");
const paidTestRoute = require("./route/paidTestRoutes");
const transporter = nodemailer.createTransport({
 host: "smtp.hostinger.com",
 port: 587,
 secure: false,
 auth: {
  user: "pushpendra@arvmultimedia.com",
  pass: "Arv@1996",
 },
});

app.post("/course-enquiry", async (req, res) => {
 const { fullname, email, mobile, description } = req.body;
 console.log(req.body);

 const mailOptions = {
  from: "pushpendra@arvmultimedia.com",
  to: "pushpendra.arv@gmail.com",
  subject: `Enquiry From ${fullname}`,
  html: `
        <h1>Course Enquiry</h1>
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile Number:</strong> ${mobile}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
 };
 try {
  await transporter.sendMail(mailOptions);
  res.status(201).send("Email sent successfully.");
 } catch (error) {
  console.error(error);
  res.status(500).send("Failed to send email.");
 }
});
app.use("/api/sub-topic", subAndTopicAddRoutes);
app.use("/api/question/sub", subjectRouter);
app.use("/api/question/year", year_based_route);
app.use("/api", subjectRoutes);
app.use("/api", yearRoutes);
app.use("/api/questions/add", questionsRoutes);
app.use("/api/questions", fetchquestionsRoute);
app.use("/api/user", userRouter);
app.use("/api/questions", fetchtopicquestion);
app.use("/api", score);
app.use("/api", userAnswerRoutes);
app.use("/api", getQuestionBySubjectAndTopicRouter);
app.use("/api", paidTestRoute);

app.use((err, req, res, next) => {
 console.error(err);
 res.status(500).send("Internal Server Error");
});
connectDB()
 .then(() => {
  app.listen(process.env.port, () => {
   console.log(`Server is running on port ${process.env.port}`);
  });
 })
 .catch((error) => {
  console.error("Error connecting to MongoDB:", error);
 });
