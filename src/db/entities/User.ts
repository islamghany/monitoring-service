//import { Order } from "./Check";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Check } from "./Check";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: "citext",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
  })
  hashed_password: string;

  @Column({
    type: "bool",
    default: false,
  })
  activated: boolean;

  @Column({
    type: "bool",
    default: false,
  })
  is_blocked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Check, (check) => check.user)
  checks: Check[];
}
