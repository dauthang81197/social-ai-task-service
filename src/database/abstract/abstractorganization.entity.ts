import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractOrganizationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'organization_id',
    nullable: true,
  })
  public organizationId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    select: true,
    default: null,
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deleteAt: Date;
}
