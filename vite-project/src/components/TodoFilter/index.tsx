import "./index.css";
import { Status } from "../Todo";

type Props = {
  filterTodos: (status: Status) => void;
};

export function TodoFilter({ filterTodos }: Props) {
  return (
    <div className="todo_filter">
      <button
        type="button"
        className="todo_filter__button"
        onClick={() => filterTodos("all")}
      >
        ALL
      </button>
      <button
        type="button"
        className="todo_filter__button"
        onClick={() => filterTodos("active")}
      >
        ACTIVE
      </button>
      <button
        type="button"
        className="todo_filter__button"
        onClick={() => filterTodos("completed")}
      >
        COMPLETED
      </button>
    </div>
  );
}
