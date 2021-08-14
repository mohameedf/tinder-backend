import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { Contact } from "./Contact";
import { User } from "./User";
@Entity()
export class UserContact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  // @Column()
  // icon: string;

  @ManyToOne((type) => Contact, (contact) => contact.userContacts)
  contact: Contact;

  @ManyToOne((type) => User, (user) => user.contacts)
  user: User;
}
