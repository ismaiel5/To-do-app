import { html, css, LitElement } from "lit";

export class TodoListElement extends LitElement {
  static properties = {
    todoList: { type: Array },
    completedTasksMessage: {},
  };

  connectedCallback() {
    super.connectedCallback();
    const todoAppComponent = document.querySelector("todo-app");
    todoAppComponent.addEventListener("clicked", (event) => {
      this.todoList = event.detail;
      this.requestUpdate();
    });
  }
  static styles = css`
    .task-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
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

  _deleteTask(index) {
    this.todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.requestUpdate();
  }

  get tasks() {
    return this.shadowRoot.querySelectorAll("#task");
  }

  _completeTask(index) {
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

  render() {
    return html` ${this.todoList?.length > 0
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
          <h3>${this.completedTasksMessage}</h3>
        </div>`}`;
  }
}
customElements.define("todo-list-element", TodoListElement);
