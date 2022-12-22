//import { Order } from "./Check";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsEmail, Min, Max } from "class-validator";
import { Check } from "./Check";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  @Length(4, 50)
  name: string;

  @Column({
    type: "text",
    nullable: false,
    unique: true,
  })
  @Length(4, 50)
  username: string;

  @Column({
    type: "citext",
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @Min(6)
  @Max(72)
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Check, (check) => check.user)
  checks: Check[];
}
