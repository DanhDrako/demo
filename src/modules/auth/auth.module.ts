import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from 'src/common/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(jwtConstants.SECRET),
        signOptions: {
          expiresIn: `${configService.get(jwtConstants.EXPIRATION_TIME)}`,
        },
      }),
    }),
  ],
  // imports: [
  //   UsersModule,
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.register({
  //     secretOrPrivateKey: jwtConstants.SECRET,
  //     signOptions: { expiresIn: jwtConstants.EXPIRATION_TIME },
  //   }),
  // ],

  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
