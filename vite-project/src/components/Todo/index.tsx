import "./index.css";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { TodoForm } from "../TodoForm";
import { TodoFilter } from "../TodoFilter";
import { TodoList } from "../TodoList";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
export type Status = "all" | "active" | "completed";

export function Todo() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>("all");

  const filteredTodos = useMemo(() => {
    switch (status) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
    }
  }, [status, todos]);

  const generateId = () => {
    const last = todos.at(-1);
    if (!last) return 0;
    return last.id + 1;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim() === "") return;
    setTodos((prev) => [
      ...prev,
      { id: generateId(), title: todo, completed: false },
    ]);
    setTodo("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const filterTodos = (_status: Status) => {
    setStatus(_status);
  };

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className="todo">
      <TodoForm onSubmit={onSubmit} onChange={onChange} todo={todo} />
      <TodoFilter filterTodos={filterTodos} />
      {filteredTodos.length > 0 ? (
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
}
