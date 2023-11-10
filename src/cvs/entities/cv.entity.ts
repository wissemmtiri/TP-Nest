import { TimeStampColumns } from "../../generics/timestamp.entities";
import { Skill } from "../../skills/entities/skill.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv extends TimeStampColumns {
    @PrimaryGeneratedColumn()
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