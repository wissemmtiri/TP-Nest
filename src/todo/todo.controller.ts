import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    @Get()
    findAll(
        @Query('isAdmin') isAdmin: boolean = false,
        @Query('page') page: number = 1
    ): Todo[] {
        return this.todoService.findAll(isAdmin, page);
    }

    @Get('/status')
    getStatus() {
        return this.todoService.getStatus();
    }

    @Get('/:name')
    findOne(
        @Param('name') name: string
    ) {
        return this.todoService.findOne(name);
    }

    @Post()
    createTodo(
        @Body() todo: AddTodoDto
    ) {
        return this.todoService.create(todo);
    }

    @Put()
    updateTodo(
        @Body() todo: UpdateTodoDto
    ) {
        return this.todoService.update(todo);
    }

    @Delete('/:name')
    deleteTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.delete(name);
    }
}
