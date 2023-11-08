import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), JwtModule.register({
    secret: process.env.SECRET_KEY
  })],
  controllers: [TodoController],
  providers: [TodoService, JwtService]
})
export class TodoModule { }
