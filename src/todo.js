import { list_holder } from './list_holder.js';
import { Points } from './todo_point.js';

let current_todo = ""

// todo functions
const Todo = (() => {
    // selects the div that holds the todo lists
    let main_list = document.getElementById("lists");

    // shows all the lists
    const refresh = () => {
        clear_list();
        for (let i = 0; i < list_holder.length; i++) {
            let holder = document.createElement("list");
            let holder_title = document.createElement("h1");
            holder_title.textContent = list_holder[i].name;
            holder.appendChild(holder_title);
            del_button(holder, list_holder[i]);
            current_list(holder_title, list_holder[i]);
            holder.value = list_holder[i];
            main_list.appendChild(holder);
        };
        localStorage.setItem('list', JSON.stringify(list_holder));
    };

    // current list click
    const current_list = (holder, list) => {
        holder.addEventListener("click", function () { set_current(list) });
    }
    
    // sets current list
    const set_current = (list) => {
        current_todo = list
        Points.show_button();
        Points.refresh();
    };

    // clears the dive that holds the lists
    const clear_list = () => {
        while (main_list.firstChild) {
            main_list.removeChild(main_list.lastChild);
        };
    };

    // makes delete button
    const del_button = (holder, list) => {
        let del = document.createElement("button");
        del.innerHTML = `Delete ${list.name}`;
        del.addEventListener("click", function () { delete_list(list) });
        holder.appendChild(del);
    }

    // deletes from main list
    const delete_list = (list) => {
        const sure = confirm(`Delete ${list.name}?`)
        if (sure === true) {
            check(list);
            list_holder.splice(list_holder.indexOf(list), 1)
            refresh();
        }
    }

    // changes current list if it is the same one as the deleted list
    const check = (list) => {
        if (list == current_todo){
            current_todo = ""
            Points.refresh();
            Points.hide_button();
        }
    }


    return { refresh };
})();

export { Todo, current_todo };