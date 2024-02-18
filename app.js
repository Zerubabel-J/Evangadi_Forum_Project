require("dotenv").config()
const express = require("express");
const app = express();
const port = 5009;

// db connection
const dbConnection = require("./db/dbConfig");

// app.get('/', (req, res)=>{
//     res.send('welcome')
// })

// user routes middleware file
const userRoutes = require("./routes/userRouts");

const questionRoutes = require("./routes/questionRouter");
// authMiddleweare
const authMiddleware = require("./middleweare/authMiddleware")

// jeson middlewear to extract json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware
app.use("/api/questions", authMiddleware,  questionRoutes);

// answer routes middleware

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
