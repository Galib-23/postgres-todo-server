const express = require('express');
const cors = require('cors');
const pool = require("./db");
const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());


// || ROUTES ||

//---------- CRETE A TODO -----------
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query("INSERT INTO todo (description) values($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

//---------- GET All TODOs -----------

//---------- GET A TODO -----------

//---------- UPDATE A TODO -----------

//---------- DELETE A TODO -----------


app.listen(5000, () => {
    console.log("Server running on port 5000")
})