import { HttpException, Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) { }

    async findAll(isAdmin: boolean, page: number): Promise<Todo[]> {
        let start = (page - 1) * 2;
        let end = start + 2;
        let todos = [];
        if (isAdmin) {
            todos = await this.todoRepository.find();
            todos = todos.slice(start, end);
        }
        else {
            todos = await this.todoRepository.find({ where: { DeletedAt: null } });
            todos = todos.slice(start, end);
        }
        return todos;
    }

    async findOne(name: string): Promise<Todo> {
        let todo = await this.todoRepository.findOne({ where: { name: name } });
        if (todo) {
            return todo;
        }
        throw new HttpException(
            'Todo not found',
            404
        )
    }

    async create(newtodo: AddTodoDto) {
        let todo = await this.todoRepository.findOne({ where: { name: newtodo.name } });
        if (!todo) {
            todo = new Todo();
            todo.name = newtodo.name;
            todo.description = newtodo.description;
            todo.completed = false;
            this.todoRepository.save(todo);
            return "Todo created successfully"
        }
        throw new HttpException(
            'Todo already exist',
            400
        )
    }

    async update(newtodo: UpdateTodoDto) {
        let todo = await this.todoRepository.findOne({ where: { name: newtodo.name } });
        if (todo) {
            todo.completed = newtodo.completed;
            this.todoRepository.save(todo);
            return "Todo updated successfully"
        }
        throw new HttpException(
            'Todo not found',
            404
        )
    }

    async softDelete(name: string) {
        let todo = await this.todoRepository.findOne({ where: { name: name } });
        if (todo) {
            await this.todoRepository.softDelete(name);
            return "Todo deleted successfully"
        }
        throw new HttpException(
            'Todo not found',
            404
        )
    }

    async delete(name: string) {
        let todo = await this.todoRepository.findOne({ where: { name: name } });
        if (todo) {
            await this.todoRepository.delete(todo);
            return "Todo deleted successfully"
        }
        throw new HttpException(
            'Todo not found',
            404
        )
    }

    async restore(name: string) {
        let todo = await this.todoRepository.findOne({ where: { name: name } });
        let restored;
        if (!todo) {
            restored = await this.todoRepository.restore(name);
            return "Todo Recovered Successfully"
        }
        throw new HttpException(
            'Cant perform this action',
            400
        )
    }

    async getStatus() {
        let completed = await this.todoRepository.count({ where: { completed: true } });
        let incompleted = await this.todoRepository.count({ where: { completed: false } });
        return {
            "completed": completed,
            "incompleted": incompleted
        }
    }
}