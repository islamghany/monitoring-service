import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { IsUrl, isURL } from "class-validator";
import { ProtocolTypes } from "../../types/enums";
import { Report } from "./Report";
import { User } from "./User";

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
  @IsUrl()
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
  })
  port: number;

  @Column({
    type: "text",
  })
  @IsUrl()
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
    default: 1,
  })
  threshold: number;

  @Column({
    type: "simple-json",
  })
  authentication: {
    username: string;
    password: string;
  };

  @Column({
    type: "simple-json",
    name: "http_headers",
  })
  httpHeaders: { key: string; value: string }[];

  @Column({
    type: "simple-json",
  })
  asserts: { code: number };

  @Column({
    type: "simple-array",
  })
  tags: string[];

  @Column({
    type: "bool",
    name: "ignore_ssl",
  })
  ignoreSSL: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Report)
  report: Report;

  @ManyToOne(() => User, (user) => user.checks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;
}
