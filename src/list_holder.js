import { Todo_list } from './todo_list.js';

// holds the lists
let list_holder = [Todo_list("default", [])];

// local storage
function storage()  {
    if (localStorage.getItem('list')) {
        list_holder = JSON.parse(localStorage.getItem('list'));
    }
}

export { list_holder, storage }