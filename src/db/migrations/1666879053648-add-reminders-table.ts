import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRemindersTable1666879053648 implements MigrationInterface {
  name = 'addRemindersTable1666879053648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reminders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "color" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token_id" uuid, CONSTRAINT "PK_38715fec7f634b72c6cf7ea4893" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reminders" ADD CONSTRAINT "FK_60120b79f4eba4a51116598efc0" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reminders" DROP CONSTRAINT "FK_60120b79f4eba4a51116598efc0"`);
    await queryRunner.query(`DROP TABLE "reminders"`);
  }
}
