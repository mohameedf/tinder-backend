import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Intrest } from "./Intrest";
import { Match } from "./Match";
import { Music } from "./Music";
import { UserContact } from "./UserContact";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: Gender;

  @Column()
  favorite_gender: Gender;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ default: 5 })
  otpCount: number;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => UserContact, (contacts) => contacts.user)
  contacts: UserContact[];

  @ManyToMany((type) => Intrest, (intrest) => intrest.users)
  intrests: Intrest[];

  @ManyToMany((type) => Music, (music) => music.users)
  musics: Music[];

  @OneToMany((type) => Match, (user1) => user1.user1)
  user1: Match;

  @OneToMany((type) => Match, (user2) => user2.user2)
  user2: Match;
}
