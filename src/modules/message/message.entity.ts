import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { UserEntity } from '../user/user.entity';

@Entity('messages')
export class MessageEntity extends AbstractEntityWithAudit {
  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'receiver_id' })
  receiver: UserEntity;
}
