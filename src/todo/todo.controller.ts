import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParamsDTO } from './dto/search-params.dto';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    @Get()
    findAll(
        @Query('page') page: number = 1
    ): Promise<Todo[]> {
        return this.todoService.findAll(page);
    }

    @Get('/status')
    getStatus() {
        return this.todoService.getStatus();
    }

    @Get('/search')
    findBy(
        @Body() params: ParamsDTO
    ) {
        console.log(params);
        return this.todoService.findBy(params);
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

    @Patch()
    updateTodo(
        @Body() todo: UpdateTodoDto
    ) {
        return this.todoService.update(todo);
    }

    @Delete('soft-delete/:name')
    softDeleteTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.softDelete(name);
    }

    @Get('delete/:name')
    hardDeleteTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.delete(name);
    }

    @Get('restore/:name')
    restoreTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.restore(name);
    }
}
