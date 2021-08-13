import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column('enum')
    gender: 'male' | 'female';
    
    @Column()
    favorite_gender: string;

    @Column()
    city: string;

    @Column()
    phone: string;

    @Column()
    bio: string;

    @Column()
    image: string;

    @Column()
    isActive: boolean;

    @Column()
    otp: string;

    @Column()
    otpCount: string;

    @Column()
    isVerified: boolean;

}
