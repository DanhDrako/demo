import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateAdminDTO } from '../users/dto/create-admin.dto';
import { ManagerEntity } from './entities/manager.entity';

@Injectable()
export class ManagerService {}
