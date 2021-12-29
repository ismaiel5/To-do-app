import { html, css, LitElement } from "lit";

export class TodoApp extends LitElement {
  constructor() {
    super();
  }

  static styles = css``;

  render() {
    return html`<div>
        <h2>Add new task</h2>
      <ul></ul>
    </div>`;
  }
}
customElements.define('todo-app',TodoApp);
