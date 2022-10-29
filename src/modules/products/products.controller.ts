import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiBearerAuth()
@ApiTags('Product')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  // create category
  // get all user
  @Get()
  getUsers() {
    return this.productService.getAll();
  }

  // get product by id
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.productService.getById(String(id));
  }

  @Post()
  async createCategory(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // update cate
  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() cate: UpdateProductDto) {
    return this.productService.update(id, cate);
  }

  //delete cate
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.productService.delete(String(id));
  }
}
