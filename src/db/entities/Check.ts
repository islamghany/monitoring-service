import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ProtocolTypes } from "../../types/enums";
import { Report } from "./Report";
import { User } from "./User";

class Header {
  key: string;
  value: string;
}
@Entity()
export class Check {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "text",
  })
  name: string;

  @Column({
    nullable: false,
    type: "text",
  })
  url: string;

  @Column({
    type: "enum",
    enum: ProtocolTypes,
    nullable: false,
  })
  protocol: ProtocolTypes;

  @Column({
    type: "text",
  })
  path: string;

  @Column({
    type: "int8",
    nullable: true,
  })
  port: number;

  @Column({
    type: "text",
    nullable: true,
  })
  webhook: string;

  @Column({
    type: "int",
    default: 5,
  })
  timeout: number;

  @Column({
    type: "int",
    default: 10,
  })
  interval: number;

  @Column({
    type: "int",
    nullable: true,
  })
  intervalId: number;

  @Column({
    type: "int",
    default: 1,
  })
  threshold: number;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  authentication: {
    username: string;
    password: string;
  };

  @Column("jsonb", {
    nullable: true,
  })
  httpHeaders: Record<string, string>[];

  @Column({
    type: "simple-json",
    nullable: true,
  })
  asserts: { code: number };

  @Column({
    type: "text",
    array: true,
    default: [],
  })
  tags: string[];

  @Column({
    type: "bool",
    default: false,
  })
  ignoreSSL: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Report, { nullable: true })
  @JoinColumn()
  report: Report;

  @ManyToOne(() => User, (user) => user.checks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;
}
