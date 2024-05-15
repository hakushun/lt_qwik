import "./index.css";
import { Todo } from "../Todo";

type Props = {
  todos: Todo[];
  toggle: (id: number) => void;
  remove: (id: number) => void;
};

export function TodoList({ todos, toggle, remove }: Props) {
  return (
    <ul className="todo_list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo_list__item">
          <input
            type="checkbox"
            name={`${todo.id}`}
            id={`${todo.id}`}
            onChange={() => toggle(todo.id)}
            checked={todo.completed}
            className="todo_list__checkbox"
          />
          <label
            htmlFor={`${todo.id}`}
            className={`todo_list__title ${todo.completed ? "todo_list__title--checked" : ""}`}
          >
            {todo.title}
          </label>
          <button
            type="button"
            onClick={() => remove(todo.id)}
            className="todo_list__button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
