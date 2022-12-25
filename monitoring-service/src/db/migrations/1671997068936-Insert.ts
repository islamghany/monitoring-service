import { MigrationInterface, QueryRunner } from "typeorm";

export class Insert1671997068936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
         CREATE INDEX IF NOT EXISTS check_name_idx ON "check" USING GIN (to_tsvector('simple', name));
        `);

    queryRunner.query(`
         CREATE INDEX IF NOT EXISTS check_tags_idx ON "check" USING GIN (tags);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
