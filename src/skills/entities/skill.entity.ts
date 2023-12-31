import { Cv } from "../../cvs/entities/cv.entity";
import { TimeStampColumns } from "../../generics/timestamp.entities";
import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill extends TimeStampColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation: string;

    @ManyToMany(
        () => Cv,
        (cv) => cv.skills
    )
    cvs: Cv[];
}