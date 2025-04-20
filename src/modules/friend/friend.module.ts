import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendController } from './friend.controller';
import { FriendEntity } from './friend.entity';
import { FriendService } from './friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity])],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
