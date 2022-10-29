import {
  HttpException,
  HttpStatus,
  Injectable,
  Response,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { ManagerEntity } from '../manager/entities/manager.entity';
import * as bcrypt from 'bcrypt';
import { IResponse } from 'src/common/Interfaces/response.interface';
import { ResponseCommon } from 'src/common/dto/respone.dto';
import { LoginUserDTO } from '../auth/dto/in-login.dto';
import { UserRole, UserStatus } from 'src/common/constants';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  //getAllUser
  async getUsers() {
    return this.usersRepository.find();
  }

  //getUserbyID
  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async FindByLogin({ email, password }: LoginUserDTO): Promise<IResponse> {
    const userInDb = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!userInDb) {
      return new ResponseCommon(404, false, 'CANNOT_FOUND_USER', null);
    }

    const comparePassword = await bcrypt.compare(password, userInDb.password);
    if (!comparePassword) {
      return new ResponseCommon(400, false, 'PASSWORD_INCORECT', null);
    }

    return new ResponseCommon(200, true, 'SUCCESS', userInDb);
  }

  async createUser(userDTO: CreateUserDTO) {
    const userInDb = await this.usersRepository.findOne({
      where: { email: userDTO.email },
    });
    if (!userInDb) {
      const dataInsert = plainToClass(UserEntity, {
        email: userDTO.email,
        password: userDTO.password,
        roles: UserRole.MANAGER,
        status: UserStatus.ACTIVE,
      });
      const resultInDb = await this.usersRepository.save(dataInsert);
      if (resultInDb) {
        return new ResponseCommon(201, true, 'CREATE_SUCCESS', resultInDb);
      }
      return new ResponseCommon(500, false, 'SERVER_ERROR', null);
    }
    return new ResponseCommon(400, false, 'EMAIL_ALREADY_EXIST', null);
  }

  // update
  async updateUser(id: string, userDTO: UpdateUserDTO) {
    await this.usersRepository.update(id, userDTO);
    const updateUser = await this.usersRepository.findOne({ where: { id } });
    if (updateUser) {
      return updateUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteUser(id: string) {
    const deleteUser = await this.usersRepository.delete(id);
    if (!deleteUser.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  //create admin
  async createAdmin(userDTO: CreateUserDTO) {
    const findUser = await this.usersRepository.findOne({
      where: { email: userDTO.email },
    });
    if (!findUser) {
      const dataInsertUser = plainToClass(UserEntity, {
        email: userDTO.email,
        password: userDTO.password,
        roles: 'MANAGER',
      });
      const dataInsertAdmin = plainToClass(ManagerEntity, {
        firstName: 'admin',
        lastName: '01',
        rolesManager: 'ADMIN',
        user: dataInsertUser,
      });
      const newUser = await this.usersRepository.save(dataInsertUser);
      console.log(newUser);
      return newUser;
    }
    throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
  }

  // async getByEmail(email: string) {
  //   const user = await this.usersRepository.findOne({
  //     where: { email: email },
  //   });
  //   if (user) {
  //     return user;
  //   }
  //   throw new HttpException(
  //     'User with this email does not exist',
  //     HttpStatus.NOT_FOUND,
  //   );
  // }
  async findByPayload(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }
}
