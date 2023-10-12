import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor() {
        this.todos = []
    }
    private todos: Todo[]

    findAll(isAdmin: boolean, page: number): Todo[] {
        let start = (page - 1) * 2;
        let end = start + 2;
        let todos = [];
        if (isAdmin) {
            todos.push(this.todos.slice(start, end));
        }
        else {
            todos = this.todos.filter((todo) => {
                return todo.DeletedAt == null;
            })
            todos = todos.slice(start, end);
        }
        return todos;
    }

    findOne(name: string) {
        let exist: Todo = null;
        this.todos.forEach((test) => {
            if (test.name == name) {
                exist = test;
            }
        })
        if (exist) {
            return exist;
        }
        return "Todo not found"
    }

    create(newtodo: AddTodoDto) {
        const todo = new Todo();
        let exist = false;
        this.todos.forEach((test) => {
            if (test.name == newtodo.name) {
                exist = true;
            }
        })
        if (exist) {
            return "Todo already exist"
        }
        todo.name = newtodo.name;
        todo.description = newtodo.description;
        todo.completed = false;
        if (this.todos.length > 0) {
            todo.id = this.todos[this.todos.length - 1].id + 1;
        }
        else {
            todo.id = 1;
        }
        todo.CreatedAt = new Date();
        todo.UpdatedAt = new Date();
        todo.DeletedAt = null;
        this.todos.push(todo);
        return "Todo created successfully"
    }

    update(todo: UpdateTodoDto) {
        let exist = false;
        this.todos.forEach((test) => {
            if (test.name == todo.name) {
                exist = true;
                test.completed = todo.completed;
                test.UpdatedAt = new Date();
            }
        })
        if (exist) {
            return "Todo updated successfully"
        }
        return "Todo not found"
    }

    delete(name: string) {
        let exist = false;
        this.todos.forEach((test) => {
            if (test.name == name) {
                exist = true;
                test.DeletedAt = new Date();
            }
        })
        if (exist) {
            return "Todo deleted successfully"
        }
        return "Todo not found"
    }

    getStatus() {
        let completed = 0;
        let incompleted = 0;
        this.todos.forEach((todo) => {
            if (todo.completed) {
                completed++;
            }
            else {
                incompleted++;
            }
        })
        return {
            completed: completed,
            incompleted: incompleted
        }
    }
}