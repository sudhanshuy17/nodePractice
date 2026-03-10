const sql = require("mysql2")

const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "9460",
    database: "company"
})

connection.connect(function(err){    // this is a handler function
    if(err){
        console.log("Error", err.message);
    }
    else{
        console.log("Connection Succesful!");
    }
})

module.exports = connection;