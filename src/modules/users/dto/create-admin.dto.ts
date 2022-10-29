import { ApiProperty } from '@nestjs/swagger';
import { ManagerRole } from 'src/common/constants';
export class CreateAdminDTO {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  userId: string;
}
