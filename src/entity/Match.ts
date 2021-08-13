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
enum Status {
  PENDING,
  ACCEPTED,
  BLOCKED,
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: Status;

  @ManyToOne((type) => User, (user1) => user1.user1)
  user1: User;

  @ManyToOne((type) => User, (user2) => user2.user2)
  user2: User;
}
