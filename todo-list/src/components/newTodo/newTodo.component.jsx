import { useState } from "react";

import "./newTodo.styles.css";

function NewTodo(props) {
    const { addTodo } = props;

    const [newTodo, setNewTodo] = useState("");

    const updateNewItem = (e) => {
        const { value } = e.target;
        setNewTodo(value);
      };

    const addTodoInternal = ()=>{
        addTodo(newTodo);
        setNewTodo("");
    };

  return (
    <div className="form">
        <input
          type="text"
          className="new-item"
          name="newItem"
          onChange={updateNewItem}
          value={newTodo}
        />

        <button onClick={addTodoInternal}>
          <span>Add</span>
        </button>
      </div>
  );
}

export default NewTodo;
