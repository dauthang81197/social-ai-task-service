// src/modules/permissions/entities/permission.entity.ts
import { Entity, Column } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';

@Entity('permissions')
export class PermissionEntity extends AbstractEntityWithAudit {
  @Column({ unique: true })
  name: string; // Tên quyền (read, write, delete...)

  @Column()
  description: string;
}
