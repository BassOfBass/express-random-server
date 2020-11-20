import { useState } from "react";
/**
 * @typedef FormProps
 * @property {(name: string) => void} addTask 
 */

/**
 * @param {FormProps} props
 */
export function Form({ addTask }) {
  const [name, setName] = useState("");
  
  return (
    <form onSubmit={handleSubmit} >
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} e 
   */
  function handleChange(e) {
    setName(e.target.value);
  }

  /**
   * @param {import("react").FormEvent} e 
   */
  function handleSubmit(e) {
    e.preventDefault();

    if (name !== null && name !== "") {
      addTask(name);
    } else { return; }
    
    setName("");
  }
};