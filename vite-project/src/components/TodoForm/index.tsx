import "./index.css";
import { ChangeEvent, FormEvent } from "react";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  todo: string;
};

export function TodoForm({ onSubmit, onChange, todo }: Props) {
  return (
    <form onSubmit={onSubmit} className="todo_form">
      <input
        type="text"
        name="todo"
        required
        className="todo_form__input"
        value={todo}
        onChange={onChange}
      />
      <button type="submit" className="todo_form__button">
        Add
      </button>
    </form>
  );
}
