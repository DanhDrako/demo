import { ManagerEntity } from '../../manager/entities/manager.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole, UserStatus } from 'src/common/constants';
import { StudentEntity } from 'src/modules/students/entities/student.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsNotEmpty()
  //@Exclude()
  password: string;

  @Column('enum', { enum: UserRole })
  roles: UserRole;

  @Column({ name: 'is_delele', default: false })
  isDelete: boolean;

  @Column({ default: UserStatus.NEW })
  status: UserStatus;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToOne(() => ManagerEntity, (admin) => admin.user)
  admin: ManagerEntity;

  @OneToOne(() => StudentEntity, (student) => student.user)
  student: StudentEntity;
}
