import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostEntity extends AbstractEntityWithAudit {
  @Column()
  content: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
