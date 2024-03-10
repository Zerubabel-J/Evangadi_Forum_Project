const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// post answer
const giveAnswer = async (req, res) => {
  const { answer } = req.body;
  console.log("ansewer", answer);
  console.log("Answer length:", answer.length);

  const question_id = req.params.questionid;
  const user_id = req.user.userid;
  // console.log(req.params);
  // console.log(req.user);
  // console.log("questionid", question_id);
  // console.log("userid", user_id);
  if (!answer) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ msg: "provide answer field" });
  }
  try {
    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [question_id, user_id, answer]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something went to wrong try again later" });
  }
};

// read all answer
async function readAllAnswer(req, res) {
  const questionid = req.params.questionid;
  const allAnswer = `SELECT answer, username FROM answers JOIN users ON answers.userid = users.userid WHERE questionid = '${questionid}'`;
  try {
    const connection = await dbConnection.getConnection();
    const [result] = await connection.query(allAnswer);
    connection.release();

    if (result.length === 0) {
      res.send("No answers provided");
    } else {
      res.json({ answers: result });
    }
  } catch (err) {
    res.send(err.message);
  }
}

// read single answer
async function singleAnswer(req, res) {
  const answerid = req.params.answerid;
  const allAnswer = `SELECT * FROM answers WHERE answerid = '${answerid}'`;
  try {
    const connection = await dbConnection.getConnection();
    const [result] = await connection.query(allAnswer);
    connection.release();

    if (result.length === 0) {
      res.send("No answers");
    } else {
      res.json({ answers: result });
    }
  } catch (err) {
    res.send(err.message);
  }
}

// edit single answer
async function editAnswer(req, res) {
  const answerid = req.params.answerid;
  const { answer } = req.body;

  if (!answer) {
    return res.send("Answer is required");
  }

  const updateAnswer = `UPDATE answers SET answer="${answer}" WHERE answerid ='${answerid}'`;

  try {
    const [result] = await dbConnection.query(updateAnswer);

    if (result.affectedRows == 0) {
      return res.send(`No Answer with id '${answerid}'`);
    } else {
      return res.json("Answer updated");
    }
  } catch (err) {
    return res.send(err.message);
  }
}

// Delete single answer
async function deleteAnswer(req, res) {
  const answerid = req.params.answerid;
  const deleteA = `DELETE FROM answers WHERE answerid ='${answerid}'`;

  try {
    await dbConnection.query(deleteA);
    return res.json("Answer deleted");
  } catch (err) {
    return res.send(err.message);
  }
}
// my answer
async function myAnswer(req, res) {
  const userid = req.params.userid;
  const allAnswer = `SELECT * FROM answers WHERE userid = '${userid}'`;
  try {
    const connection = await dbConnection.getConnection();
    const [result] = await connection.query(allAnswer);
    connection.release();

    if (result.length === 0) {
      res.send("No answers");
    } else {
      res.json({ answers: result });
    }
  } catch (err) {
    res.send(err.message);
  }
}
module.exports = {
  giveAnswer,
  readAllAnswer,
  singleAnswer,
  editAnswer,
  deleteAnswer,
  myAnswer,
};
