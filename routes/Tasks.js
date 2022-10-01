const router = require("express").Router();
const sql = require("../db.js")

router.get("/", (req, res) => {
    sql.query("SELECT * FROM Task", (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully retrieved all tasks");
            res.status(200).send(result);
        }
    });
})