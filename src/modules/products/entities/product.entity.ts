import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Category } from 'src/modules/categories/entities/category.entity';

@Entity()
export class Product {
  //@PrimaryGeneratedColumn('uuid') id: string;
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  //===== Foreign key
  @ManyToOne(() => Category, (category) => category.products, {})
  cateId: Category;
}
