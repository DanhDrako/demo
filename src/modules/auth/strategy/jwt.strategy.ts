import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import { jwtConstants } from 'src/common/config';
import { UserStatus } from 'src/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     (request: Request) => {
    //       return request?.cookies?.Authentication;
    //     },
    //   ]),
    //   secretOrKey: configService.get(jwtConstants.SECRET),
    // });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.SECRET,
    });
  }

  async validate(payload: any, done: Function) {
    const account = await this.userService.findByPayload(payload.email);
    if (!account) {
      return done(new UnauthorizedException(), false);
    }

    if (account.status === UserStatus.LOCK) {
      return done(new ForbiddenException('USER_LOCKED'), false);
    }

    done(null, account);
  }
  // async validate(payload: TokenPayload) {
  //   return this.userService.getByEmail(payload.email);
  // }
  // async validate(payload: any, done: Function) {
  //   const account = await this.userService.findByPayload(payload.email);
  //   if (!account) {
  //     return done(new UnauthorizedException(), false);
  //   }

  //   if (account.status === UserStatus.LOCK) {
  //     return done(new ForbiddenException('USER_LOCKED'), false);
  //   }

  //   done(null, account);
  //}
}
