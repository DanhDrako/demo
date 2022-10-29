import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { ProductsController } from './modules/products/products.controller';
import { ProductsService } from './modules/products/products.service';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesController } from './modules/categories/categories.controller';
import { CategoriesService } from './modules/categories/categories.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { StudentsModule } from './modules/students/students.module';
import { AdminModule } from './modules/manager/manager.module';
import { AuthModule } from './modules/auth/auth.module';
import { dbConfig } from './common/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: '127.0.0.1',
    //   port: 6100,
    //   username: 'postgres',
    //   password: '123',
    //   database: 'demo',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: <any>dbConfig.DB_TYPE,
      host: dbConfig.DB_HOST,
      port: dbConfig.DB_PORT,
      username: dbConfig.DB_USERNAME,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: ['error', 'warn', 'log'],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    StudentsModule,
    AdminModule,

    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
