import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Check } from "./Check";
import { IsNumber } from "class-validator";
import { ServerStatus } from "../../types/enums";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ServerStatus,
    nullable: false,
  })
  status: string;

  @Column({
    type: "float",
    nullable: false,
  })
  @IsNumber()
  availability: number;

  @Column({
    type: "int8",
    nullable: false,
  })
  outages: number;

  @Column({
    type: "int8",
    default: 0,
  })
  alertTimes: number;

  @Column({
    type: "bigint",
    default: 0,
  })
  downtime: number;

  @Column({
    type: "bigint",
    default: 0,
  })
  uptime: number;

  @Column({
    type: "simple-array",
    nullable: false,
  })
  responseTimes: number[];

  @Column({
    type: "simple-array",
    nullable: false,
  })
  history: Date[];

  // @OneToOne(() => Check, {
  //   onDelete: "CASCADE",
  // })
  // check: Check;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}
