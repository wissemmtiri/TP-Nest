import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private JwtService: JwtService

  ) { }

  async register(createUserDto: CreateUserDto) {
    try {
      const userdb = new User();
      userdb.username = createUserDto.username;
      userdb.email = createUserDto.email;
      userdb.salt = await bcrypt.genSalt();
      if (createUserDto.password == createUserDto.confirmPassword) {
        userdb.password = await bcrypt.hash(createUserDto.password, userdb.salt);
      }
      else {
        throw new HttpException(
          'Password and Confirm Password are not same',
          HttpStatus.NOT_ACCEPTABLE
        )
      }
      return await this.userRepository.save(userdb);
    }
    catch {
      throw new HttpException(
        'Error creating User',
        HttpStatus.NOT_ACCEPTABLE
      )
    }
  }

  async login(loginCreds: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email: loginCreds.email } });
      const password = await bcrypt.hash(loginCreds.password, user.salt || '');
      if (user && (password === user.password)) {
        const payload = {
          UserId: user.id
        };
        const token = await this.JwtService.signAsync(
          payload,
          {
            secret: process.env.SECRET_KEY
          }
        )
        let testpayload = await this.JwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET_KEY
          }
        );
        await this.userRepository.save(user);
        return {
          "USER": user.username,
          "TOKEN": token
        }
      }
      else {
        throw new HttpException(
          'Wrong Credentials',
          HttpStatus.UNAUTHORIZED
        )
      }
    }
    catch {
      throw new HttpException(
        'Wrong Credentials',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  //------------------------------------------------------------------

  async findAll() {
    let users = await this.userRepository.find();
    users.forEach(user => {
      delete user.password;
      delete user.salt;
      delete user.UpdatedAt;
      delete user.DeletedAt;
    });
    return users;
  }

  async findOne(email: string) {
    console.log(email);
    let user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      delete user.password;
      delete user.salt;
      delete user.UpdatedAt;
      delete user.DeletedAt;
      return user;
    }
    else {
      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND
      )
    }
  }

  async delete(UserId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: UserId } });
      await this.userRepository.delete(user);
      return { "Message": "User Deleted Successfully" };
    }
    catch {
      throw new HttpException(
        'Error deleting User',
        HttpStatus.NOT_ACCEPTABLE
      )
    }
  }
}
