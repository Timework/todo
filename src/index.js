import { Todo } from './todo.js';
import { Todoform} from './todo-form.js';
import { Points } from './todo_point.js';
import { list_holder, storage } from './list_holder.js';


Todoform.add_buttons();
Points.add_buttons();
storage();
Todo.refresh();