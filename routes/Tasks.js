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

router.get('/:isCompleted', (req, res) => {
    sql.query("SELECT * FROM task WHERE isCompleted = ?", req.params.isCompleted, (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully retrieved all tasks with isCompleted: ",req.params.isCompleted);
            res.status(200).send(result);
        }
    })
});

router.post("/", (req, res) => {
    sql.query("INSERT INTO task (taskName,createdDate,isCompleted) VALUES(?,?,?)", [req.body.taskName,req.body.createdDate,0], (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully inserted the task");
            res.status(200).send(result);
        }
    });
})

router.put("/:id", (req, res) => {
    var datetime = new Date();
    sql.query("UPDATE task SET taskName = ?, createdDate = ?, completedDate = ?, isCompleted = ? WHERE taskId = ?", [req.body.taskName,req.body.createdDate,datetime.toISOString().slice(0,10),req.body.isCompleted,req.params.id], (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully updated the task with id: ",req.params.id);
            res.status(200).send(result);
        }
    });
})

router.put("/:id", (req, res) => {
    var datetime = new Date();
    sql.query("UPDATE task SET completedDate=?,isCompleted = ? WHERE taskId = ?", [datetime.toISOString().slice(0,10),req.body.isCompleted,req.params.id], (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully updated the task with id: ",req.params.id);
            res.status(200).send(result);
        }
    });
})

router.delete("/:id", (req, res) => {
    sql.query("DELETE FROM task WHERE taskId = ?", req.params.id, (err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully deleted the task with id: ",req.params.id);
            res.status(200).send(result);
        }
    });
})

router.delete('/', (req, res) => {
    sql.query("DELETE * FROM task ",(err, result) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).send(err);
        } else {
            console.log("Successfully deleted all tasks");
            res.status(200).send(result);
        }
    })
});

module.exports = router;