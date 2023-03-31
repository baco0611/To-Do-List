import html from "../core.js";
import Header from "./Header.js"
import TodoList from "./ToDoList.js";
import Footer from "./Footer.js";

function App() {
    return html`
        <section class="todoapp">
            ${Header()}
            ${TodoList()}
            ${Footer()}
        </section>
    `
}

export default App