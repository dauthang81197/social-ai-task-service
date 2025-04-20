import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: 'users.EMAIL_IS_INVALID' })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  organizationName: string;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  files: Array<Express.Multer.File>;
}
