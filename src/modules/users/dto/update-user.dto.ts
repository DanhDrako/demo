import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
