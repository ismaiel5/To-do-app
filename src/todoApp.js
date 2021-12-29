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
    #todo-container {
      padding: 0px 10px;
      display: block;
      width: 50%;
      margin-left: 25%;
    }
    #title {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      text-align: center;
    }
    .input-item {
      display: flex;
      justify-content: space-between;
      gap: 5px;
    }
    .input-item #new-task {
      font-size: 1em;
      width: 100%;
      padding: 5px;
      flex: 2.5;
    }
    .input-item button {
      cursor: pointer;
      flex: 0.5;
    }

    ul {
      list-style-type: none;
      padding-left: 0px;
      box-shadow: 0px 2px 10px 2px #888888;
      border-radius: 10px;
    }
    ul hr {
      margin: 0px;
      border: 1px solid #e2e2e2;
    }
    ul hr:last-child {
      display: none;
    }

    .task-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
    }
    .task-item > div,
    .task-item button {
      cursor: pointer;
    }
    li {
      display: inline;
      margin: 1em 0;
    }
    .task-item #task {
      transform: scale(1.2);
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

  _deleteTask(index) {
    this.todoList.splice(index, 1);
    this.requestUpdate();
  }

  render() {
    return html` <h1 id="title">To do list</h1>
      <div id="todo-container">
        <div class="input-item">
          <input id="new-task" placeholder="What needs to be done ?" type="text" />
          <button @click=${this._addNewTask}>Add task</button>
        </div>

        <ul>
          ${this.todoList.map(
            (task, index) => html`
              <div class="task-item">
                <div @click=${() => this._completeTask(index)}>
                  <input id="task" type="checkbox" />
                  <li class=${task.completed ? "completed" : ""}>${task.task}</li>
                </div>
                <button @click=${() => this._deleteTask(index)}>X</button>
              </div>
              <hr />
            `
          )}
        </ul>
      </div>`;
  }
}
customElements.define("todo-app", TodoApp);
