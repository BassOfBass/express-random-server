import { StrictMode } from 'react';
import { render } from 'react-dom';
import { nanoid } from "nanoid";

import 'src/index.css';
import { App } from 'src/App';

export class TodoTask {
  /**
   * @param {string} name 
   * @param {HTMLElement["id"]} id 
   * @param {HTMLInputElement["defaultChecked"]} isCompleted 
   */
  constructor(
    name, 
    isCompleted = false,
    id = "todo-" + nanoid()
  ) {
    this.name = name;
    this.id = id;
    this.isCompleted = isCompleted;
  }
}

/**
 * @type TodoTask[]
 */
export const DATA = [
  new TodoTask("Eat", true),
  new TodoTask("Sleep"),
  new TodoTask("Repeat"),
];

render(
  <StrictMode>
    <App todoTasks={DATA} />
  </StrictMode>,
  document.querySelector('#maincontent')
);