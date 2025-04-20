import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LogExecutionTime } from 'src/decorators/log-execution-time.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Controller('admin/auth')
@ApiTags('admin-auth')
@ApiBearerAuth()
@LogExecutionTime()
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin login successfully',
  })
  @ApiBadRequestResponse({
    description: 'Username or password incorrect',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('/forget-password')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Forget password successfully',
  // })
  // async forgetPassword(
  //   @Query() query: ForgetPasswordDto,
  //   @I18n() i18n: I18nContext,
  // ) {
  //   return this.authService.forgetPassword(query, i18n, UserGroupEnum.SYSTEM);
  // }
}
