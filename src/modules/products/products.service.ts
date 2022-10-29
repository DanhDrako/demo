import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ResponseCommon } from 'src/common/dto/respone.dto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async getAll() {
    return this.productRepository.find();
  }
  async getById(id: string) {
    const productInDb = await this.productRepository.findOne({
      where: { id: id },
    });
    if (productInDb)
      return new ResponseCommon(200, true, 'FIND_SUCCESS', productInDb);
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }
  async create(dto: CreateProductDto) {
    const cateInDb = await this.productRepository.findOne({
      where: { id: dto.id },
    });
    if (!cateInDb) {
      const dataInsert = plainToClass(Product, dto);
      //if(dto.cateId!=)
      const resultInDb = await this.productRepository.save(dataInsert);
      if (resultInDb) {
        return new ResponseCommon(201, true, 'CREATE_SUCCESS', resultInDb);
      }
      return new ResponseCommon(500, false, 'SERVER_ERROR', null);
    }
    return new ResponseCommon(400, false, 'ID_ALREADY_EXIST', null);
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (updateProduct) {
      const result = await this.productRepository.update(id, updateProductDto);
      return new ResponseCommon(200, true, 'UPDATE_SUCCESS', result);
    }
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }

  async delete(id: string) {
    const deleteCate = await this.productRepository.findOne({ where: { id } });
    if (deleteCate) {
      await this.productRepository.delete(id);
      return new ResponseCommon(200, true, 'DELETE_SUCCESS', null);
    }
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }
}
