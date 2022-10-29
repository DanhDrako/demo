import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity()
export class Category {
  //@PrimaryGeneratedColumn('uuid') id: string;
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  //===== foreign key
  @OneToMany(() => Product, (product) => product.cateId)
  products: Product[];
}
