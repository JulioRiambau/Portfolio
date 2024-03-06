import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Item from "./components/item/item.component";
import TodoHeader from "./components/header/todoHeader.component";
import NewTodo from "./components/newTodo/newTodo.component";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/todos/add" ,{
          todo: newTodo
        }
      );
      console.log("add Todo: " + response.data);

      setTodos([
        ...todos,
        { id: Date.now(), content: newTodo, completed: false },
      ]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/todos/toggleCompleted/" + id
      );
      console.log("toggleTodo: " + response.data);

      setTodos((todos) =>
        todos.map((todo) => {
          return todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo;
        })
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const removeTodo = async (id) => {
    

    try {
      const response = await axios.delete(
        "http://localhost:3001/todos/" +id
      );
      console.log("remove Todo: " + response.data);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error updating data:", error);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/todos");
        console.log("retrieve todos: " + response.data);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedTodos = [...todos].sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className="container">
      <TodoHeader />

      <NewTodo addTodo={addTodo} />

      <div>
        <ul>
          {sortedTodos.map((item) => {
            return (
              <Item
                key={item.id}
                todo={item}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
