import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'users.EMAIL_IS_REQUIRED',
  })
  @IsEmail({}, { message: 'users.EMAIL_IS_INVALID' })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString({
    message: 'users.PASSWORD_IS_REQUIRED',
  })
  @IsNotEmpty({
    message: 'users.PASSWORD_IS_REQUIRED',
  })
  password: string;
}
