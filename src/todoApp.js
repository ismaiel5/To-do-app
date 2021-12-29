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

  static styles = css`
    ul {
      list-style-type: none;
    }
    .task-item {
      width: 50%;
    }
    .task-item li {
      display: inline;
    }

    .completed {
      text-decoration-line: line-through;
      color: #777;
      user-select: none;
    }
  `;

  get newTask() {
    return this.shadowRoot.querySelector("#new-task");
  }
  _addNewTask() {
    this.todoList.push({ task: this.newTask.value, completed: false });
    this.newTask.value = "";
    this.requestUpdate();
  }

  get tasks() {
    return this.shadowRoot.querySelectorAll("#task");
  }

  _completeTask(index) {
    const selectedItem = this.todoList[index];
    selectedItem.completed = !selectedItem.completed;

    if (selectedItem.completed) {
      this.tasks[index].checked = true;
    } else {
      this.tasks[index].checked = false;
    }
    this.requestUpdate();
  }

  render() {
    return html`<div>
      <h2>Add new task</h2>
      <input id="new-task" placeholder="What needs to be done ?" type="text" />
      <button @click=${this._addNewTask}>Add task</button>

      <ul>
        ${this.todoList.map(
          (task, index) => html` <div class="task-item" @click=${() => this._completeTask(index)}>
            <input id="task" type="checkbox" />
            <li class=${task.completed ? "completed" : ""}>${task.task}</li>
          </div>`
        )}
      </ul>
    </div>`;
  }
}
customElements.define("todo-app", TodoApp);
