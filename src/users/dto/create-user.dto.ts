import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@yopmail.com',
    description: 'User email address',
  })
  readonly email: string;
  @ApiProperty({ example: '11111', description: 'User password' })
  readonly password: string;
}
