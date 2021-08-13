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
@Entity()
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.musics)
  @JoinTable()
  users: User[];
}
