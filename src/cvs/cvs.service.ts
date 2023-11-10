import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Skill } from 'src/skills/entities/skill.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) { }

  async create(createCvDto: CreateCvDto, userId: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const cv = new Cv();
      cv.name = createCvDto.name;
      cv.firstname = createCvDto.firstname;
      cv.age = createCvDto.age;
      cv.cin = createCvDto.cin;
      cv.job = createCvDto.job;
      cv.path = createCvDto.path;
      cv.user = user;
      await this.cvRepository.save(cv);
      return 'Cv created successfully';
    }
    catch {
      throw new HttpException(
        'Error creating cv',
        HttpStatus.NOT_ACCEPTABLE
      );
    }

  }

  async findAll() {
    try {
      let cvs = await this.cvRepository.find();
      cvs.forEach(cv => {
        delete cv.DeletedAt;
        delete cv.UpdatedAt;
      })
      return cvs;
    }
    catch {
      throw new HttpException(
        'Error fetching cvs',
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  async findOne(id: number) {
    try {
      let cv = await this.cvRepository.findOne({ where: { id: id } });
      if (cv) {
        return cv;
      }
      else {
        throw new HttpException(
          'Cv not found',
          HttpStatus.NOT_FOUND
        );
      }
    }
    catch {
      throw new HttpException(
        'Error fetching cv',
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  async addSkill(cv_id: number, skill_id: number, user_id: number) {
    try {
      let cv = await this.cvRepository.findOne({
        where: { id: cv_id },
        relations: ['skills', 'user']
      });
      if (cv) {
        if (user_id != cv.user.id) {
          throw new HttpException(
            'You are not authorized to add skills to this cv',
            HttpStatus.UNAUTHORIZED
          );
        }
        let skill = await this.skillRepository.findOne({
          where: { id: skill_id },
          relations: ['cvs']
        });
        if (!skill) {
          throw new HttpException(
            'Skill not found',
            HttpStatus.NOT_FOUND
          );
        }
        skill.cvs.push(cv);
        cv.skills.push(skill);
        await this.cvRepository.save(cv);
        await this.skillRepository.save(skill);
        return 'Skill added successfully';
      }
      else {
        throw new HttpException(
          'Cv not found',
          HttpStatus.NOT_FOUND
        );
      }
    }
    catch {
      throw new HttpException(
        'Error adding skill',
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  async delete(cv_id: number, user_id: number) {
    try {
      const cv = await this.cvRepository.findOne({ where: { id: cv_id }, relations: ['user'] });
      if (cv.user.id == user_id) {
        await this.cvRepository.delete(cv_id);
        return 'Cv deleted successfully';
      }
      else {
        throw new HttpException(
          'You are not authorized to delete this cv',
          HttpStatus.UNAUTHORIZED
        );
      }
    }
    catch {
      throw new HttpException(
        'Error deleting cv',
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }
}