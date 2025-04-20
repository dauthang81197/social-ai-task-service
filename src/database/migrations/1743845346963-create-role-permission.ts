import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolePermission1743845346963 implements MigrationInterface {
  name = 'CreateRolePermission1743845346963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "status" smallint NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "name" character varying NOT NULL, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "status" smallint NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "name" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permission_xref" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_394b61d87459b5921340ac44f53" PRIMARY KEY ("role_id", "permission_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20ff2ec8849bef19fe58ca6d84" ON "role_permission_xref" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78a48d06e2979ee0729be37b7f" ON "role_permission_xref" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role_xref" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_8000de915ac75772839862818e6" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_328f3283d9482d45058a7f7157" ON "user_role_xref" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7eeb22041a4b07e3b45ee831b" ON "user_role_xref" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission_xref" ADD CONSTRAINT "FK_20ff2ec8849bef19fe58ca6d841" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission_xref" ADD CONSTRAINT "FK_78a48d06e2979ee0729be37b7ff" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_xref" ADD CONSTRAINT "FK_328f3283d9482d45058a7f71576" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_xref" ADD CONSTRAINT "FK_c7eeb22041a4b07e3b45ee831b3" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role_xref" DROP CONSTRAINT "FK_c7eeb22041a4b07e3b45ee831b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_xref" DROP CONSTRAINT "FK_328f3283d9482d45058a7f71576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission_xref" DROP CONSTRAINT "FK_78a48d06e2979ee0729be37b7ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission_xref" DROP CONSTRAINT "FK_20ff2ec8849bef19fe58ca6d841"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c7eeb22041a4b07e3b45ee831b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_328f3283d9482d45058a7f7157"`,
    );
    await queryRunner.query(`DROP TABLE "user_role_xref"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a48d06e2979ee0729be37b7f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20ff2ec8849bef19fe58ca6d84"`,
    );
    await queryRunner.query(`DROP TABLE "role_permission_xref"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
