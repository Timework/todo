import { Todo_list } from './todo_list.js';
import { list_holder } from './list_holder.js';
import { Todo } from './todo.js';


const Todoform = (() => {
    // selects the form
    let todo = document.getElementById("new-todo-form");

    // adds event listeners to buttons in to-do form
    const add_buttons = () => {
        document.getElementById("show").addEventListener("click", show);
        document.getElementById("close").addEventListener("click", hide);
        document.getElementById("date-input").min = new Date().toISOString().split("T")[0];
        document.getElementById("date-edit").min = new Date().toISOString().split("T")[0];
        document.getElementById("todo-form").addEventListener("submit", make);
    }

    // hides form
    const hide = () => {
        todo.style.display = "none"
    }
    
    // shows form
    const show = () => {
        todo.style.display = "block"
    }

    // clears form
    const clear = () => {
        document.getElementById("name").value = ""
    }

    // makes to-do list
    const make = () => {
        let title = document.getElementById("name").value
        let list = Todo_list(title, []);
        list_holder.push(list);
        clear();
        hide();
        Todo.refresh();
    }


    return { add_buttons }

})();


export { Todoform }