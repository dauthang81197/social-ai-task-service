import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/modules/post/post.repository';
import { UserModule } from 'src/modules/user/user.module';

import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
