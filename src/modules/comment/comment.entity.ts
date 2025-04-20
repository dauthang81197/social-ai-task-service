import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comments')
export class CommentEntity extends AbstractEntityWithAudit {
  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    nullable: true,
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @Column({ name: 'post_id' })
  postId: number;
}
