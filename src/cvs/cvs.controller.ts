import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Request } from 'express';
import { addSkillToCvDto } from './dto/add-skill-to-cv.dto';

@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) { }

  @UseGuards(AuthGuard)
  @Post('add')
  create(
    @Body() createCvDto: CreateCvDto,
    @Req() request: Request
  ) {
    const userId = request['UserId'];
    return this.cvsService.create(createCvDto, +userId);
  }

  @Get('list')
  async findAll() {
    return await this.cvsService.findAll();
  }

  @Get('search/:id')
  findOne(
    @Param('id') id: string
  ) {
    return this.cvsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post('addskill')
  async addSkill(
    @Body() params: addSkillToCvDto,
    @Req() request: Request
  ) {
    const UserId = request["UserId"];
    return await this.cvsService.addSkill(+params.cv_id, +params.skill_id, +UserId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request
  ) {
    const userId = request['UserId'];
    return this.cvsService.delete(+id, +userId);
  }
}
