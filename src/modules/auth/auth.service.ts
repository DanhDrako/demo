import { ResponseCommon } from './../../common/dto/respone.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode, UserStatus } from 'src/common/constants';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/common/config';
import { IResponse } from 'src/common/Interfaces/response.interface';
import { UserEntity } from '../users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginUserDTO } from './dto/in-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(userDto: CreateUserDTO): Promise<IResponse> {
    if (userDto.password == userDto.confirmPassword) {
      return await this.usersService.createUser(userDto);
    }

    return new ResponseCommon(400, false, 'PASSWORD_CONFIRM_INCORRECT', null);
  }

  // public async getAuthenticatedUser(email: string, plainTextPassword: string) {
  //   try {
  //     const user = await this.usersService.getByEmail(email);
  //     await this.verifyPassword(plainTextPassword, user.password);
  //     user.password = undefined;
  //     return user;
  //   } catch (error) {
  //     throw new HttpException(
  //       'Wrong credentials provided',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async loginAuthen(loginUserDTO: LoginUserDTO): Promise<IResponse> {
    const resultUser = await this.usersService.FindByLogin(loginUserDTO);
    if (!resultUser.success) {
      return resultUser;
    }
    var dataInDb = plainToClass(UserEntity, resultUser.data);
    if (dataInDb.status != UserStatus.ACTIVE) {
      return new ResponseCommon(400, false, 'USER IS NOT ACTIVE', null);
    }
    const { email, roles } = dataInDb;
    const expiresIn = jwtConstants.EXPIRATION_TIME;
    const userJwt: TokenPayload = { email, roles };
    const accessToken = this.jwtService.sign(userJwt, {
      secret: jwtConstants.SECRET,
      expiresIn: expiresIn,
    });

    const dataRes = {
      username: dataInDb.email,
      accessToken: accessToken,
      expires: expiresIn,
    };
    return new ResponseCommon(200, true, 'LOGIN_SUCCESS', dataRes);
  }

  // private async verifyPassword(
  //   plainTextPassword: string,
  //   hashedPassword: string,
  // ) {
  //   const isPasswordMatching = await bcrypt.compare(
  //     plainTextPassword,
  //     hashedPassword,
  //   );
  //   if (!isPasswordMatching) {
  //     throw new HttpException(
  //       'Wrong credentials provided',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  // public getCookieWithJwtToken(email: string) {
  //   const payload: TokenPayload = { email };
  //   const token = this.jwtService.sign(payload);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     jwtConstants.EXPIRATION_TIME,
  //   )}`;
  // }
  // public getCookieForLogOut() {
  //   return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  // }
}
