# Create a server using Node.js and PostgreSQL as Database

**1.** Initialize **package.json**
```bash
npm init -y
```

**2.** Install required modules
```bash
npm i express nodemon cors pg
```

**3.** Create the **index.js** file
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server running on port 5000")
})
```

**4.** Create a file **database.sql**
```sql
CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)
```

**#** postgres commands:

- login: 
    ```sql
    psql -U postgres
    ```
- list databases:
    ```sql
    \l
    ```
- Connect to a database:
    ```sql
    \c testDb
    ```
- Find tables:
    ```sql
    \dt
    ```
**5.** Create the db and table in CMD:
```sql
CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)
```

**6.** Create the connection pool in **db.js** file:
```javascript
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "galib2723",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;
```

**7.** Import the pool in **index.js** file:
```javascript
const pool = require("./db");
```


**8.** Create the routes e.g.:
```javascript
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query("INSERT INTO todo (description) values($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});
```