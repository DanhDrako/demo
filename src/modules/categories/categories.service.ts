import { Product } from 'src/modules/products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ResponseCommon } from 'src/common/dto/respone.dto';
import { createConnection, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll() {
    return this.categoryRepository.find();
  }
  async getById(id: string) {
    const cateInDb = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (cateInDb)
      return new ResponseCommon(200, true, 'FIND_SUCCESS', cateInDb);
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }

  async getProductByIdCate(id: string) {
    const cateInDb = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (cateInDb) {
      //   createConnection()
      //     .then(async (connection) => {
      //       // SELECT SINGLE USER
      //       // SELECT USER LEFT JOIN PHONE
      //       const cate = await connection
      //         .createQueryBuilder()
      //         .select('cate')
      //         .from(CategoryEntity, 'cate')
      //         .leftJoinAndSelect('cate.products', 'products')
      //         .getMany();

      //       console.log('Products from DB: ', cate);
      //     })
      //     .catch((error) => console.log(error));
      const cate = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.products', 'product')
        .getOne();
      //.where('category.id = :id', { id: { id } })
      //.leftJoinAndSelect(Product, 'product', 'product.cateId=category.id')
      //.select('category')
      //.from(Category, 'category')
      return new ResponseCommon(200, true, 'FIND_SUCCESS', cate);
    }
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }

  async create(dto: CreateCategoryDto) {
    const cateInDb = await this.categoryRepository.findOne({
      where: { id: dto.id },
    });
    if (!cateInDb) {
      const dataInsert = plainToClass(Category, {
        id: dto.id,
        name: dto.id,
      });
      const resultInDb = await this.categoryRepository.save(dataInsert);
      if (resultInDb) {
        return new ResponseCommon(201, true, 'CREATE_SUCCESS', resultInDb);
      }
      return new ResponseCommon(500, false, 'SERVER_ERROR', null);
    }
    return new ResponseCommon(400, false, 'ID_ALREADY_EXIST', null);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCate = await this.categoryRepository.findOne({ where: { id } });
    if (updateCate) {
      const result = await this.categoryRepository.update(
        id,
        updateCategoryDto,
      );
      return new ResponseCommon(200, true, 'UPDATE_SUCCESS', result);
    }
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }

  async delete(id: string) {
    const deleteCate = await this.categoryRepository.findOne({ where: { id } });
    if (deleteCate) {
      await this.categoryRepository.delete(id);
      return new ResponseCommon(200, true, 'DELETE_SUCCESS', null);
    }
    return new ResponseCommon(400, false, 'ID_NOT FOUND', null);
  }
}
