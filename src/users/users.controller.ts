import { Controller, Get, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../core/guards/auth.guard';
import { Request } from 'express';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginCreds: LoginDto) {
    return await this.usersService.login(loginCreds);
  }

  //--------------------------------------------------------------------------------

  @Get('list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  findOne(
    @Body() params: SearchUserDto
  ) {
    return this.usersService.findOne(params.email);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async remove(
    @Req() request: Request
  ) {
    const userId = request['UserId'];
    return await this.usersService.delete(+userId);
  }
}
