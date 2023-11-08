import { TimeStampColumns } from "src/generics/timestamp.entities";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cv extends TimeStampColumns {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;

    @ManyToOne(
        () => User,
        (user) => user.cvs
    )
    user: User;

    @ManyToMany(
        () => Skill,
        (skill) => skill.cvs
    )
    @JoinTable({
        name: 'cv_skills',
        joinColumn: {
            name: 'cv_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'skill_id',
            referencedColumnName: 'id'
        }
    }
    )
    skills: Skill[];
}