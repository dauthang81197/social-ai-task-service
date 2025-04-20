import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorators';
import { LogExecutionTime } from 'src/decorators/log-execution-time.decorator';
import { QueryPostDto } from 'src/modules/post/dtos/query-post.dto';
import { PostService } from 'src/modules/post/post.service';
import { UserEntity } from 'src/modules/user/user.entity';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
@LogExecutionTime()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List Post successfully',
  })
  @ApiBadRequestResponse({
    description: 'Query params is incorrect',
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@GetUser() user: UserEntity, @Query() query: QueryPostDto) {
    return await this.postService.list(query, user);
  }
}
