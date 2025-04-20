import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { FriendModule } from './friend/friend.module';
import { HealthCheckerModule } from './health-checker/health-checker.module';
import { LikeModule } from './like/like.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PostModule } from './post/post.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { GeminiModule } from './gemini/gemini.module';

export const BASE_PLATFORM_IMPORTS = [
  HealthCheckerModule,
  UserModule,
  PostModule,
  CommentModule,
  LikeModule,
  FriendModule,
  NotificationModule,
  MessageModule,
  RolesModule,
  PermissionsModule,
  AuthModule,
];
@Module({
  imports: [...BASE_PLATFORM_IMPORTS, GeminiModule],
})
export class BaseModule {}
