import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UsersModule } from '../users/users.module';
import { CvsModule } from '../cvs/cvs.module';
import { SkillsModule } from '../skills/skills.module';

dotenv.config()
@Module({
  imports: [TodoModule, UsersModule, CvsModule, SkillsModule, TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }