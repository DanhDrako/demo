import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwt-authentication.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiBearerAuth()
@ApiTags('Category')
//@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}
  // create category
  // get all user
  @Get()
  getUsers() {
    return this.categorieService.getAll();
  }

  // get user by id
  //   @Get('/:id')
  //   getUserById(@Param('id') id: string) {
  //     return this.categorieService.getById(String(id));
  //   }
  @Get('/:id')
  async getProductByIdCate(@Param('id') id: string) {
    return this.categorieService.getProductByIdCate(String(id));
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categorieService.create(dto);
  }

  // update cate
  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() cate: UpdateCategoryDto) {
    return this.categorieService.update(id, cate);
  }

  //delete cate
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.categorieService.delete(String(id));
  }
}
