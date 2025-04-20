import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeController } from './like.controller';
import { LikeEntity } from './like.entity';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
