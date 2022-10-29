import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ManagerRole } from 'src/common/constants';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  managerId: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ default: ManagerRole.OPERATOR })
  rolesManager: ManagerRole;

  @OneToOne(() => UserEntity, (user) => user.admin)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
