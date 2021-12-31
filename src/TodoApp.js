import { html, css, LitElement } from "lit";
import { TASKS } from "./mocks/todoList";
import { ADD_TASK, TO_DO_LIST, WHAT_NEED_TO_BE_DONE, YOU_HAVE_NO_TASK_TO_BE_DONE_LETS_ADD_SOME } from "./constants";
import { TodoListElement } from "./components/TodoListElement";

class TodoApp extends LitElement {
  static properties = {
    todoList: { type: Array },
  };

  static scopedElements = {
    "todo-list-element": TodoListElement,
  };

  constructor() {
    super();
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
      color: #f2f4f7;
    }
    .input-item button:active {
      background-color: #3892fa;
    }
    #todo-container > *,
    .input-item > * {
      font-family: "Cambria";
    }
  `;
  get newTask() {
    return this.shadowRoot.querySelector("#new-task");
  }
  _addNewTask() {
    if (!this.newTask.value) return;
    this.todoList.push({ task: this.newTask.value, completed: false });
    localStorage.setItem("todoList", JSON.stringify(this.todoList));

    // return the focus to the input field for smoother entries
    this.newTask.value = "";
    this.newTask.focus();

    // adding a custom event to send the updated list on _addNewTask() function
    this.dispatchEvent(
      new CustomEvent("clicked", {
        detail: this.todoList,
      })
    );
  }

  render() {
    return html` <h1 id="title">${TO_DO_LIST}</h1>
      <div id="todo-container">
        <div class="input-item">
          <input id="new-task" placeholder=${WHAT_NEED_TO_BE_DONE} type="text" />
          <button @click=${this._addNewTask}>${ADD_TASK}</button>
        </div>
        <todo-list-element .todoList=${this.todoList} .completedTasksMessage=${YOU_HAVE_NO_TASK_TO_BE_DONE_LETS_ADD_SOME}> </todo-list-element>
      </div>`;
  }
}
customElements.define("todo-app", TodoApp);
