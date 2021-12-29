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

  get newTask() {
    return this.shadowRoot.querySelector("#new-task");
  }
  _addNewTask() {
    this.todoList.push({ task: this.newTask.value, completed: false });
    this.newTask.value = "";
    this.requestUpdate();
  }

  render() {
    return html`<div>
      <h2>Add new task</h2>
      <input id="new-task" placeholder="What needs to be done ?" type="text" />
      <button @click=${this._addNewTask}>Add task</button>

      <ul>
        ${this.todoList.map((task) => html` <li>${task.task}</li>`)}
      </ul>
    </div>`;
  }
}
customElements.define("todo-app", TodoApp);
