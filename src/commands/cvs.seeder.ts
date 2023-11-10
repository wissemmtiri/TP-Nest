import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SkillsService } from '../skills/skills.service';
import { UsersService } from '../users/users.service';
import * as falso from '@ngneat/falso';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UsersService);
    const skillService = app.get(SkillsService);

    const skills = [];
    for (let i = 0; i < 10; i++) {
        let skill = new CreateSkillDto();
        skill.designation = falso.randSkill();
        const skilldb = await skillService.create(skill);
        skills.push(skilldb);
    }

    const users = [];
    for (let i = 0; i < 10; i++) {
        let user = new CreateUserDto();
        user.email = falso.randEmail();
        user.password = falso.randPassword();
        user.confirmPassword = user.password;
        const userdb = await userService.register(user);
        users.push(userdb);
    }
}
bootstrap();