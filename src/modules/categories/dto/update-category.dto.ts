// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCategoryDto } from './create-category.dto';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
