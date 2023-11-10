import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>
  ) { }

  async create(skill: CreateSkillDto) {
    await this.skillRepository.save(skill);
    return 'Skill created successfully';
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    return await this.skillRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    return await this.skillRepository.delete({ id: id });
  }
}
