const express = require("express");
const bodyParser = require("body-parser");
const { modelTest } = require("./testBank");
const { modelQuestion } = require("./questionBank");
const { modelScores } = require("./scores");
const { modelAnswer } = require("./answerBank");
const { modelLogin } = require("./loginBank");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: ["https://eval-frontend-delta.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/loadTests", async (req, res) => {
  const data = await modelTest.find({});
  console.log("Data sent successfully");
  res.json(data);
});

app.post("/login", async (req, res) => {
  const type = req.body.type;
  const userId = req.body.userId;
  const data = await modelLogin.find({ type: type, userId: userId });
  if (data.length == 0) {
    res.json("false");
  } else {
    res.json("true");
  }
});

app.post("/loadQuestionPaper", async (req, res) => {
  const testId = req.body.testID;
  const data = await modelTest.findById(testId);
  console.log(testId);
  console.log(data);
  const arr = [];
  for (let i = 0; i < data.questionId.length; ++i) {
    const id = data.questionId[i];
    arr.push(await modelQuestion.findById(id));
  }
  res.json(arr);
});

app.post("/createNewTest", (req, res) => {
  const testId = new modelTest({
    questionId: [],
  });
  testId.save();
  res.json(testId);
});

app.post("/updateTest", async (req, res) => {
  const testID = req.body.testId;
  const questionIDs = req.body.questionIds;

  const data = await modelTest.updateOne(
    { _id: testID },
    { $push: { questionId: { $each: questionIDs } } }
  );

  res.json("updated successfully");
});

app.post("/loadProblems", async (req, res) => {
  const subject = req.body.subject;
  const level = req.body.level;
  const data = await modelQuestion.find({
    subject: subject,
    level: level,
  });
  res.json(data);
});

app.post("/addProblem", (req, res) => {
  const {
    problemStatement,
    option1,
    option2,
    option3,
    option4,
    answer,
    subject,
    level,
  } = req.body;
  const data = new modelQuestion({
    problemStatement,
    option1,
    option2,
    option3,
    option4,
    subject,
    level,
  });
  data.save();
  const questionId = data._id;
  const dataAns = new modelAnswer({
    questionId,
    corectOption: answer,
  });
  dataAns.save();
  res.json(data);
});

app.post("/calculateScore", async (req, res) => {
  const questionIDs = req.body.questionIDs;
  const options = req.body.options;
  const rollNo = req.body.rollNo;
  const testID = req.body.testID;
  let score = 0;
  for (let i = 0; i < questionIDs.length; ++i) {
    const ans = await modelAnswer.findOne({
      questionId: questionIDs[i],
    });
    if (ans.corectOption === options[i]) {
      score += 1;
    }
  }
  const data = new modelScores({
    rollNo,
    testID,
    score,
  });
  data.save();
  res.json("score calculated successfully!!!");
});

app.listen(PORT);
