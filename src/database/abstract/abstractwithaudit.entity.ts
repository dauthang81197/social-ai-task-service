import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntityWithAudit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint', default: 0 })
  public status: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    select: false,
    default: null,
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deleteAt: Date;

  @Column({
    nullable: true,
    default: null,
    name: 'created_by',
  })
  public createdBy: number;

  @Column({
    nullable: true,
    default: null,
    name: 'updated_by',
  })
  public updatedBy: number;
}
