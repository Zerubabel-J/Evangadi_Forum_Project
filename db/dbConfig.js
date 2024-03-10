const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();

// const mysql = require('mysql2/promise');

// const dbConnection = mysql.createPool({
//     user:process.env.USER,
//     database:process.env.DATABASE,
//     host: "localhost",
//     password: process.env.PASSWORD,
//     connectionLimit:10
// })

// module.exports = dbConnection;

// dbConnection.execute("select 'test'", (err,result)=>{
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log(result)
//     }
// })
