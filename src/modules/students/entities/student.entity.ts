import { Gender } from './../../../common/constants';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid') StudentId: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNotEmpty()
  dob: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  identifier: string;

  @Column({ default: Gender.MALE })
  gender: Gender;

  @Column()
  address: string;

  @Column({ unique: true })
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  avatar: string;

  @OneToOne(() => UserEntity, (user) => user.admin)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
