import { TimeStampColumns } from "src/generics/timestamp.entities";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Todo extends TimeStampColumns {

    @PrimaryColumn()
    name: string;

    @Column()
    description: string;

    @Column()
    completed: boolean;
}