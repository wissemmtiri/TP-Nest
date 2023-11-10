import { Cv } from "../../cvs/entities/cv.entity";
import { TimeStampColumns } from "../../generics/timestamp.entities";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends TimeStampColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(
        () => Cv,
        (cv) => cv.user
    )
    cvs: Cv[];
}