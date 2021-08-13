import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Contact } from "./Contact";
import { User } from "./User";
@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  icon: string;

  @ManyToOne((type) => Contact, (contact) => contact.userContacts)
  contact: Contact;

  @ManyToOne((type) => User, (user) => user.contacts)
  user: User;
}
