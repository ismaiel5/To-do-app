import { html, css, LitElement } from "lit";
import { TASKS } from "./mocks/todoList";
import { ADD_TASK, TO_DO_LIST, WHAT_NEED_TO_BE_DONE, YOU_HAVE_NO_TASK_TO_BE_DONE_LETS_ADD_SOME } from "./constants";

export class TodoApp extends LitElement {
  static properties = {
    todoList: { state: true },
    ccompletedTasksMessage: {},
  };

  constructor() {
    super();
    this.ccompletedTasksMessage = YOU_HAVE_NO_TASK_TO_BE_DONE_LETS_ADD_SOME;
    this.todoList = JSON.parse(localStorage.getItem("todoList"));

    if (!this.todoList) {
      this._loadInitialList();
    }
  }

  _loadInitialList() {
    localStorage.setItem("todoList", JSON.stringify(TASKS));
    this.todoList = JSON.parse(localStorage.getItem("todoList"));
  }

  static styles = css`
    #todo-container {
      padding: 0px 10px;
      display: block;
      width: 50%;
      margin-left: 25%;
    }
    #title {
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      text-align: center;
    }
    .input-item {
      display: flex;
      justify-content: space-between;
      gap: 2px;
    }
    .input-item #new-task {
      font-size: 1em;
      width: 100%;
      padding: 10px;
      flex: 2.5;
      border-radius: 5px 1px 1px 5px;
      border: 1px solid #888888;
    }
    .input-item button {
      cursor: pointer;
      flex: 0.5;
      border-radius: 1px 5px 5px 1px;
      border: 1px solid #888888;
      font-weight: bold;
    }
    .input-item button:hover,
    button:focus {
      background-color: #1878c7;
      color: #d4d7da;
    }
    .input-item button:active {
      background-color: #4698db;
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
      cursor: pointer;
    }
    #delete-btn {
      cursor: pointer;
      font-family: cursive;
      font-weight: bold;
      color: #9c9c9c;
    }
    #delete-btn:hover {
      color: #b93919;
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
    if (!this.newTask.value) return;
    this.todoList = JSON.parse(localStorage.getItem("todoList"));
    this.todoList.push({ task: this.newTask.value, completed: false });
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.newTask.value = "";
    this.newTask.focus();
  }

  get tasks() {
    return this.shadowRoot.querySelectorAll("#task");
  }

  _completeTask(index) {
    this.todoList = JSON.parse(localStorage.getItem("todoList"));
    const selectedItem = this.todoList[index];
    selectedItem.completed = !selectedItem.completed;
    localStorage.setItem("todoList", JSON.stringify(this.todoList));

    if (selectedItem.completed) {
      this.tasks[index].checked = true;
    } else {
      this.tasks[index].checked = false;
    }
    this.requestUpdate();
  }

  _deleteTask(index) {
    this.todoList = JSON.parse(localStorage.getItem("todoList"));
    this.todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.requestUpdate();
  }

  render() {
    return html` <h1 id="title">${TO_DO_LIST}</h1>
      <div id="todo-container">
        <div class="input-item">
          <input id="new-task" placeholder=${WHAT_NEED_TO_BE_DONE} type="text" />
          <button @click=${this._addNewTask}>${ADD_TASK}</button>
        </div>
        ${this.todoList?.length > 0
          ? html` <ul>
              ${this.todoList.map(
                (task, index) => html` <div class="task-item">
                    <div @click=${() => this._completeTask(index)}>
                      <input id="task" type="checkbox" ?checked=${task.completed} />
                      <li class=${task.completed ? "completed" : ""}>${task.task}</li>
                    </div>
                    <a id="delete-btn" @click=${() => this._deleteTask(index)}>X</a>
                  </div>
                  <hr />`
              )}
            </ul>`
          : html` <div>
              <h3>${this.ccompletedTasksMessage}</h3>
            </div>`}

        <br />
      </div>`;
  }
}
customElements.define("todo-app", TodoApp);
