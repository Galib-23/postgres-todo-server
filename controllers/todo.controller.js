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
        // Here without the $1 we can also use `${description}`

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
}

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query(`Select * from todo WHERE todo_id = ${id}`);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports ={
    getAllTodos,
    createTodo,
    getTodo,
} 
