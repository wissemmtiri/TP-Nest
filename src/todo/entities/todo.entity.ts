import { TimeStampColumns } from "../../generics/timestamp.entities";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Status } from "../enums/status.enum";

@Entity()
export class Todo extends TimeStampColumns {

    @PrimaryColumn()
    name: string;

    @Column()
    description: string;

    @Column()
    state: Status;
}