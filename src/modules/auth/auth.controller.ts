import { LoginUserDTO } from './dto/in-login.dto';
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guard/jwt-authentication.guard';
import { LocalAuthGuard } from './guard/localAuthentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/common/Interfaces/response.interface';
import { CreateUserDTO } from '../users/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(200)
  // @UseGuards(LocalAuthGuard)
  // @Post('log-in')
  // async logIn(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('log-out')
  // async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
  //   response.setHeader(
  //     'Set-Cookie',
  //     this.authenticationService.getCookieForLogOut(),
  //   );
  //   return response.sendStatus(200);
  // }
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create account' })
  @Post('/register')
  async register(@Body() registrationData: CreateUserDTO): Promise<IResponse> {
    return this.authService.register(registrationData);
  }

  // @HttpCode(200)
  // @UseGuards(LocalAuthGuard)
  // @Post('log-in')
  // async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
  //   const { user } = request;
  //   const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
  //   response.setHeader('Set-Cookie', cookie);
  //   user.password = undefined;
  //   return response.send(user);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Body() loginUserDto: LoginUserDTO): Promise<IResponse> {
    return await this.authService.loginAuthen(loginUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }
}
