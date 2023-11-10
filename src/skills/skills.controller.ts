import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService
  ) { }

  @Post('add')
  async create(
    @Body() createSkillDto: CreateSkillDto
  ) {
    return this.skillsService.create(createSkillDto);
  }

  @Get('list')
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get('/search/:id')
  async findOne(
    @Param('id') id: string
  ) {
    return this.skillsService.findOne(+id);
  }

  @Delete('delete/:id')
  async remove(
    @Param('id') id: string
  ) {
    return this.skillsService.delete(+id);
  }
}
