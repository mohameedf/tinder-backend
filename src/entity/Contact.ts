import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { UserContact } from "./UserContact";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  icon: string;

  @OneToMany((type) => UserContact, (userContacts) => userContacts.user)
  userContacts: UserContact[];
}
