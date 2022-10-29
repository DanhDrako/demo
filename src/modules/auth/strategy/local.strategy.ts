import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { LocalStragetyDto } from '../dto/local-strategy.dto';
import { UserStatus } from 'src/common/constants';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  // async validate(email: string, password: string): Promise<UserEntity> {
  //   return this.authenticationService.getAuthenticatedUser(email, password);
  // }
  async validate(email: string, password: string): Promise<LocalStragetyDto> {
    const user = await this.userService.findByPayload(email);
    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    if (user.status === UserStatus.LOCK) {
      throw new ForbiddenException('USER_LOCKED');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException('USER_NOT_ACTIVE');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const result = plainToClass(LocalStragetyDto, {
      sub: user.id,
      email: user.id,
      role: user.roles,
      status: user.status,
    });
    return result;
  }
}
