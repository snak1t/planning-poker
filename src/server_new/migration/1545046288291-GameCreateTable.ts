import {MigrationInterface, QueryRunner} from "typeorm";

export class GameCreateTable1545046288291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `game` ADD UNIQUE INDEX `IDX_0152ed47a9e8963b5aaceb51e7` (`title`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `game` DROP INDEX `IDX_0152ed47a9e8963b5aaceb51e7`");
    }

}
