import { Body, Controller, Delete, Get, Param, Post, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParamsDTO } from './dto/search-params.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';


@Controller()
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) { }

    @UseGuards(AuthGuard)
    @Get('todos')
    findAll(
        @Query('page') page: number = 1
    ): Promise<Todo[]> {
        return this.todoService.findAll(page);
    }

    @Get('/status')
    getStatus() {
        return this.todoService.getStatus();
    }

    @Get('todo/search')
    findBy(
        @Body() params: ParamsDTO
    ) {
        return this.todoService.findBy(params);
    }

    @Get('todo/:name')
    findOne(
        @Param('name') name: string
    ) {
        return this.todoService.findOne(name);
    }

    @UseGuards(AuthGuard)
    @Post('addtodo')
    createTodo(
        @Body() todo: AddTodoDto
    ) {
        return this.todoService.create(todo);
    }

    @UseGuards(AuthGuard)
    @Patch('updatetodo')
    updateTodo(
        @Body() todo: UpdateTodoDto
    ) {
        return this.todoService.update(todo);
    }

    @UseGuards(AuthGuard)
    @Delete('todo/soft-delete/:name')
    softDeleteTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.softDelete(name);
    }

    @UseGuards(AuthGuard)
    @Get('todo/delete/:name')
    hardDeleteTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.delete(name);
    }

    @UseGuards(AuthGuard)
    @Get('todo/restore/:name')
    restoreTodo(
        @Param('name') name: string,
    ) {
        return this.todoService.restore(name);
    }
}
