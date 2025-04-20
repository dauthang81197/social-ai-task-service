import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint', default: 0 })
  public status: number;

  @DeleteDateColumn({
    nullable: true,
    select: true,
    default: null,
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deleteAt: Date;
}
