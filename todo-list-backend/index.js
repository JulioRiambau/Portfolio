import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors"
import env from "dotenv";

const app = express();
const port = 3001;
env.config();
app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

async function getTodos() {
    
    const query = `SELECT * FROM todos;`
    const result = await db.query(query);
    console.log("getTodos result: "+result);
    let items = [];
    result.rows.forEach((item) => {
      items.push(item);
    });
    return items;
  }

app.get("/todos", async (req, res) => {
    try {
      const todos = await getTodos();
      res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error});
    }
  });


  app.post("/todos/add", async (req, res) => {
    try {

      console.log("add todo req.body: "+req.body.todo);
      
      const query = `INSERT INTO todos (content, completed) VALUES ('${req.body.todo}', false) RETURNING *;`
      const result = await db.query(query);
      console.log("add todo result: "+ JSON.stringify(result.rows[0]));
      res.status(200).send('OK');
    } catch (error) {
        res.status(500).json({ error: error});
    }
  });

  app.put("/todos/toggleCompleted/:id", async (req, res) => {
    try {

      const { id } = req.params;
      
      console.log(`toggleCompleted id: ${id}`);

      const result = await db.query('SELECT completed FROM todos WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Entry not found' });
      }

      console.log(`toggleCompleted result: ${JSON.stringify( result.rows[0])}`);

      const currentCompletedStatus = result.rows[0].completed;

      const updatedStatus = !currentCompletedStatus;

      console.log(`toggleCompleted updatedStatus: ${updatedStatus}`);

      await db.query('UPDATE todos SET completed = $1 WHERE id = $2', [updatedStatus, id]);

      res.json({ id, completed: updatedStatus });

    } catch (error) {
        res.status(500).json({ error: error});
    }
  });

  app.delete('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      await db.query('DELETE FROM todos WHERE id = $1', [id]);
      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });