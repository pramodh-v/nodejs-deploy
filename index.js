const express = require('express');
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "testdb1.cp88egymboqh.ap-south-1.rds.amazonaws.com",
    user: "root",
    password: "host1234",
    database: "testdb1"
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
