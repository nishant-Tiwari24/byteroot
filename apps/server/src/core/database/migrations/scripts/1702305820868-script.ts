import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702305820868 implements MigrationInterface {
  name = 'Script1702305820868'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" (
        "id",
        "email", 
        "name", 
        "pictureUrl", 

"password",
        "status"
      ) VALUES (
        '21a857f1-ba5f-4435-bcf6-f910ec07c0dc',
        'test@test.com',
        'John Doe',
        'https://i.imgur.com/sbRCzP7.png',

'$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC',
        'VERIFIED'
      );

      INSERT INTO "authorization_role" (
        "id",
        "name"
      ) VALUES (
        'a7548b29-a984-40b5-a5ea-286b9ebeae18',
        'admin'
      );

      INSERT INTO "authorization_role_user" (
        "userId",
        "roleId"
      ) VALUES (
        '21a857f1-ba5f-4435-bcf6-f910ec07c0dc',
        'a7548b29-a984-40b5-a5ea-286b9ebeae18'
      );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
