import { Cv } from "src/cvs/entities/cv.entity";
import { TimeStampColumns } from "src/generics/timestamp.entities";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Skill extends TimeStampColumns {
    @PrimaryColumn()
    id: number;

    @Column()
    designation: string;

    @ManyToMany(
        () => Cv,
        (cv) => cv.skills
    )
    cvs: Cv[];
}