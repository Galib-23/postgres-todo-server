const express = require('express');
const cors = require('cors');
const pool = require("./utils/db");
const {getAllTodos, createTodo, getTodo, updateTodo, deleteTodo} = require('./controllers/todo.controller');
const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());


// -----ROUTES-----

// CRETE A TODO
app.post("/todos", createTodo);

// GET All TODOs
app.get("/todos", getAllTodos)

// GET A TODO
app.get("/todos/:id", getTodo);

// UPDATE A TODO
app.put("/todos/:id", updateTodo);

// DELETE A TODO
app.delete("/todos/:id", deleteTodo);


app.listen(5000, () => {
    console.log("Server running on port 5000")
})