// src/modules/roles/entities/role.entity.ts
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { AbstractEntityWithAudit } from '../../database';
import { PermissionEntity } from '../permissions/permissions.entity';

@Entity('roles')
export class RolesEntity extends AbstractEntityWithAudit {
  @Column({ unique: true })
  name: string; // Tên vai trò (admin, user...)

  @ManyToMany(() => PermissionEntity, { nullable: true })
  @JoinTable({
    name: 'role_permission_xref',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: (PermissionEntity | undefined)[];
}
