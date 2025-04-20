import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFieldPermission1743846806197 implements MigrationInterface {
  name = 'UpdateFieldPermission1743846806197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "description"`,
    );
  }
}
