import { current_todo } from './todo.js';
import { Todo_item } from './todo_item.js';
import { formatDistanceToNow, format, formatDistance, formatRelative, subDays} from 'date-fns'
import { list_holder } from './list_holder.js';

const Points = (() => {
    // finds the form
    let new_form = document.getElementById("todo-item-form-holder");
    let item_display = document.getElementById("list-item-holder");

    // adds event listeners to buttons in to-do item form
    const add_buttons = () => {
        document.getElementById("show-item-form").addEventListener("click", show);
        document.getElementById("close-item").addEventListener("click", hide);
        document.getElementById("todo-item").addEventListener("submit", make);
    }

    const show_button = () => {
        document.getElementById("show-button-holder").style.display = "block"
    }

    const hide_button = () => {
        document.getElementById("show-button-holder").style.display = "none"
    }

    // hides form
    const hide = () => {
        new_form.style.display = "none"
    }

    // shows form
    const show = () => {
        new_form.style.display = "block"
    }

    // clears form
    const clear = () => {
        document.getElementById("title").value = ""
        document.getElementById("des").value = ""
        document.getElementById("date-input").value = ""
        document.getElementById("prior").value = "1"
    }
    // clears the old display
    const clear_display = () => {
        while (item_display.firstChild) {
            item_display.removeChild(item_display.lastChild);
        };
    }

    // shows all points
    const refresh = () => {
        clear_display();
        if (current_todo !== "") {
            let item_display_title = document.createElement("h1");
            item_display_title.innerHTML = current_todo.name;
            item_display.appendChild(item_display_title);
            for (let i = 0; i < current_todo.items.length; i++){
                let item_holder = document.createElement("ul");
                let title = document.createElement("li");
                let des = document.createElement("li");
                let date = document.createElement("li");
                title.innerHTML = current_todo.items[i].title;
                des.innerHTML = current_todo.items[i].des;
                let inside = current_todo.items[i].date.split("-")
                date.innerHTML = formatDistanceToNow(new Date(inside[0], inside[1] - 1, inside[2]))
                cross_effects(title, current_todo.items[i])
                item_holder.appendChild(title);
                item_holder.appendChild(des);
                item_holder.appendChild(date);
                color(item_holder, current_todo.items[i].priority);
                cross_button(item_holder, current_todo.items[i]);
                edit_button(item_holder, current_todo.items[i]);
                delete_button(item_holder, current_todo.items[i]);
                item_display.appendChild(item_holder);
            }
        }
        localStorage.setItem('list', JSON.stringify(list_holder));
    }

    // makes edit button
    const edit_button = (item, piece) => {
        let button = document.createElement("button");
        button.innerHTML = "Edit"
        button.addEventListener("click", function () { edit(piece); });
        item.appendChild(button);
    }

    // editing item
    const edit = (piece) => {
        document.getElementById("title-edit").value = piece.title
        document.getElementById("des-edit").value = piece.des
        document.getElementById("date-edit").value = piece.date
        document.getElementById("prior-edit").value = piece.priority
        document.getElementById("todo-item-edit-holder").style.display = "block"
        document.getElementById("todo-item-edit").addEventListener("submit", function () { saving(current_todo.items.indexOf(piece));});
    }

    // saves edit choices
    const saving = (number) => {
        let piece = current_todo.items[number];
        piece.title = document.getElementById("title-edit").value
        piece.des = document.getElementById("des-edit").value
        piece.date = document.getElementById("date-edit").value
        piece.priority = document.getElementById("prior-edit").value
        document.getElementById("todo-item-edit-holder").style.display = "none";
        let old_element = document.getElementById("todo-item-edit");
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        refresh();
    }

    // makes delete button
    const delete_button = (item, piece) => {
        let button = document.createElement("button");
        button.innerHTML = "Delete"
        button.addEventListener("click", function () { deletes(piece); });
        item.appendChild(button);
    }

    // deleting item
    const deletes = (piece) => {
        const sure = confirm(`Delete ${piece.title}?`)
        if (sure === true) {
            current_todo.items.splice(current_todo.items.indexOf(piece), 1)
            refresh();
        }
    }

    // makes cross button
    const cross_button = (item, piece) => {
        let button = document.createElement("button");
        button.innerHTML = cross_text(piece);
        button.addEventListener("click", function () { change_cross(piece);});
        item.appendChild(button);
    }

    // cross button text
    const cross_text = (piece) => {
        if (piece.cross){
            return "Undo"
        } else {
            return "Finish"
        }
    }

    // change cross
    const change_cross = (item) => {
        if (item.cross === true){
            item.cross = false
        } else {
            item.cross = true
        }
        refresh();
    }

    // add cross effects
    const cross_effects = (item, piece) => {
        if (piece.cross === true) {
            item.innerHTML = item.innerHTML.strike();
        }
    } 

    // shows priority by color
    const color = (item, prior) => {
        switch (prior) {
            case "1":
                item.style.color = "green"
                break;
            case "2":
                item.style.color = "yellow"
                break;
            case "3":
                item.style.color = "red"
                break;
        }
    }

    // makes to-do item
    const make = () => {
        let title = document.getElementById("title").value
        let des = document.getElementById("des").value
        let dates = document.getElementById("date-input").value
        let prior = document.getElementById("prior").value
        let list = Todo_item(title, des, dates, prior, false);
        list.date = document.getElementById("date-input").value
        current_todo.items.push(list);
        clear();
        hide();
        refresh();
    }

    return { add_buttons, show_button, hide_button, refresh }
})();

export { Points }