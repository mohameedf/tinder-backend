import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { UserContact } from "./UserContact";

@Entity()
export class Contact extends BaseEntity {
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
