import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Contact } from "./Contact";
import { User } from "./User";
export enum Status {
  PENDING = "pending",
  ACCEPTED = "accepted",
  BLOCKED = "blocked",
}

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: Status;

  @ManyToOne((type) => User, (user1) => user1.user1)
  user1: User;

  @ManyToOne((type) => User, (user2) => user2.user2)
  user2: User;
}
