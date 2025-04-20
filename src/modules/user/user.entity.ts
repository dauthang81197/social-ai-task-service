import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { CommentEntity } from '../comment/comment.entity';
import { PostEntity } from '../post/post.entity';
import { RolesEntity } from '../roles/roles.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends AbstractEntityWithAudit {
  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ManyToMany(() => RolesEntity)
  @JoinTable({
    name: 'user_role_xref',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RolesEntity[];
}
