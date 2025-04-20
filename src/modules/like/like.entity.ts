import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity('likes')
export class LikeEntity extends AbstractEntityWithAudit {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
