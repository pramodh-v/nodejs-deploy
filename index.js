const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/', (req, res) => {
    res.json({message:'Hello World!'});
});

app.use('/api/tasks', require('./routes/Tasks'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
