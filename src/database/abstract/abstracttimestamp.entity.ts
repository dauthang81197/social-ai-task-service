import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

export abstract class AbstractTimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'integer', nullable: true })
  createdBy: number;

  @Column({ name: 'updated_by', type: 'integer', nullable: true })
  updatedBy: number;

  @DeleteDateColumn({
    nullable: true,
    select: true,
    default: null,
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deleteAt: Date;
}
