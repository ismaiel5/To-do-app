import { html, css, LitElement } from "lit";
import { TASKS } from "./mocks/todoList";

export class TodoApp extends LitElement {
  static properties = {
    todoList: { type: Array },
  };

  constructor() {
    super();
    this.todoList = TASKS;
  }

  static styles = css``;

  render() {
    return html`<div>
      <h2>Add new task</h2>
      <ul>
        ${this.todoList.map((task) => html` <li>${task.task}</li>`)}
      </ul>
    </div>`;
  }
}
customElements.define("todo-app", TodoApp);
