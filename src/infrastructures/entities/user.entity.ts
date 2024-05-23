import { Entity, PrimaryGeneratedColumn, Index, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column('varchar', { unique: true })
    email: string;

    @Index({ unique: true })
    @Column('varchar', { unique: true })
    username: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    password: string;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column({ nullable: true })
    lastLogin?: Date;

    @Column({ type: 'varchar', nullable: true })
    refreshToken?: string;
}
