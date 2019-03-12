import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Planeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    degrees: string;

    @Column()
    planeta: string;
}
