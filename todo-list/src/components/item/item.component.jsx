import "./item.styles.css";

function Item(props) {
  const { todo, toggleTodo, removeTodo } = props;
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.content}
        </span>
        <button className="remove" onClick={() => removeTodo(todo.id)}><i className="fas fa-trash-alt"></i></button>
      </label>
    </li>
  );
}

export default Item;
