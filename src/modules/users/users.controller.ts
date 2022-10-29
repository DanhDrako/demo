import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
import JwtAuthGuard from '../auth/guard/jwt-authentication.guard';
import { LocalAuthGuard } from '../auth/guard/localAuthentication.guard';

@Controller('users')
@ApiBearerAuth()
//@UseGuards(LocalAuthGuard)
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}
  // get all user
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // get user by id
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(String(id));
  }

  // create user
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  //create admin
  @Post('/admin')
  async createAdmin(@Body() user: CreateUserDTO) {
    return this.userService.createAdmin(user);
  }

  // update user
  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.updateUser(id, user);
  }

  //delete user
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(String(id));
  }
}
