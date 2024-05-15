import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import "./index.css";
import type { Status } from "~/routes";

type Props = {
  filterTodos: QRL<(status: Status) => void>;
};

export const TodoFilter = component$(({ filterTodos }: Props) => {
  return (
    <div class="todo_filter">
      <button
        type="button"
        class="todo_filter__button"
        onClick$={() => filterTodos("all")}
      >
        ALL
      </button>
      <button
        type="button"
        class="todo_filter__button"
        onClick$={() => filterTodos("active")}
      >
        ACTIVE
      </button>
      <button
        type="button"
        class="todo_filter__button"
        onClick$={() => filterTodos("completed")}
      >
        COMPLETED
      </button>
    </div>
  );
});
