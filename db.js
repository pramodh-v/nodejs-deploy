const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
});

connection.connect(error => {
    if (error) console.log("Error: Connection failed: ",error.stack);
    else
        console.log("Successfully connected to the database: ",process.env.RDS_DB_NAME);
});