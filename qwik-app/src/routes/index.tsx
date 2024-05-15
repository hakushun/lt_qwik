import { component$, $, useSignal, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./index.css";
import { TodoFilter } from "~/components/TodoFilter";
import { TodoForm } from "~/components/TodoForm";
import { TodoList } from "~/components/TodoList";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
export type Status = "all" | "active" | "completed";

export default component$(() => {
  const todo = useSignal<string>("");
  const todos = useSignal<Todo[]>([]);
  const status = useSignal<Status>("all");

  const filteredTodos = useComputed$(() => {
    switch (status.value) {
      case "all":
        return todos.value;
      case "active":
        return todos.value.filter((todo) => !todo.completed);
      case "completed":
        return todos.value.filter((todo) => todo.completed);
    }
  });

  const generateId = $(() => {
    const last = todos.value.at(-1);
    if (!last) return 0;
    return last.id + 1;
  });

  const onSubmit = $(async () => {
    if (todo.value.trim() === "") return;
    todos.value = [
      ...todos.value,
      { id: await generateId(), title: todo.value, completed: false },
    ];
    todo.value = "";
  });

  const filterTodos = $((_status: Status) => {
    status.value = _status;
  });

  const toggleCompleted = $((id: number) => {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
  });

  const deleteTodo = $((id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  });

  return (
    <main class="todo">
      <TodoForm onSubmit={onSubmit} todo={todo} />
      <TodoFilter filterTodos={filterTodos} />
      {filteredTodos.value.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          toggle={toggleCompleted}
          remove={deleteTodo}
        />
      ) : (
        <div>Nothing to do.</div>
      )}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo App",
};
