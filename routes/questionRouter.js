const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");

const { askquestion, readAllQuestion, readQuestion, editQuestion, deleteQuestion, myQuestion, likeQuestion, dislikeQuestion} = require("../controller/questionController");

// insert question 
router.post("/ask-questions", askquestion);

// red all question
router.get("/all-questions", readAllQuestion);


// read single question
  router.get('/all-questions/:questionid', readQuestion);


// update single question
router.patch('/edit-questions/:id', editQuestion);

  // Delete single question
router.delete('/all-questions/:id', deleteQuestion)

// my question
router.get('/my-questions/:userid', myQuestion);

// Update like count for a question
router.patch("/all-questions/:questionid/like", likeQuestion) 

// Update dislike count for a question
router.patch("/all-questions/:questionid/dislike",  dislikeQuestion)
module.exports = router;
