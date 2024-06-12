const pool = require('../utils/db.js')

const getAllTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("Select * from todo");

        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const createTodo = async (req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query("INSERT INTO todo (description) values($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
}

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query(`Select * from todo WHERE todo_id = $1`, [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id }= req.params;
        const { description } = req.body;
        console.log(id, description);
        const updateTodo = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING * `, [description, id]);
        res.json(updateTodo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json({message: "Todo deleted"})
    } catch (error) {
        console.error(error.message);
    }
}

module.exports ={
    getAllTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
} 
