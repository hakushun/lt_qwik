import type { QRL, Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import "./index.css";
import type { Todo } from "~/routes";

type Props = {
  todos: Signal<Todo[]>;
  toggle: QRL<(id: number) => void>;
  remove: QRL<(id: number) => void>;
};

export const TodoList = component$(({ todos, toggle, remove }: Props) => {
  return (
    <ul class="todo_list">
      {todos.value.map((todo) => (
        <li key={todo.id} class="todo_list__item">
          <input
            type="checkbox"
            name={`${todo.id}`}
            id={`${todo.id}`}
            onChange$={() => toggle(todo.id)}
            checked={todo.completed}
            class="todo_list__checkbox"
          />
          <label
            for={`${todo.id}`}
            class={`todo_list__title ${todo.completed ? "todo_list__title--checked" : ""}`}
          >
            {todo.title}
          </label>
          <button
            type="button"
            onClick$={() => remove(todo.id)}
            class="todo_list__button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
});
