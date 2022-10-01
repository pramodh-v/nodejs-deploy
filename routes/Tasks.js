const router = require("express").Router();
const sql = require("../db.js")

router.get("/", (req, res) => {
    sql.query("SELECT * FROM task", (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully retrieved all tasks");
            res.status(200).send(result);
        }
    });
})

router.get("/:id", (req, res) => {
    sql.query("SELECT * FROM task WHERE taskId = ?", req.params.id, (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully retrieved the task with id: ",req.params.id);
            res.status(200).send(result);
        }
    });
})


router.post("/", (req, res) => {
    sql.query("INSERT INTO task (taskName,createdDate,taskId) VALUES(?,?,?)", req.body.taskName,req.body.createdDate,req.body.taskId, (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully inserted the task");
            res.status(200).send(result);
        }
    });
})

module.exports = router;