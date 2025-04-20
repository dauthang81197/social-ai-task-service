import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { UserEntity } from '../user/user.entity';

@Entity('friends')
export class FriendEntity extends AbstractEntityWithAudit {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requester_id' })
  requester: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'recipient_id' })
  recipient: UserEntity;
}
