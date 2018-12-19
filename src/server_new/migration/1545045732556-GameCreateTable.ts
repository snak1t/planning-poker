import {MigrationInterface, QueryRunner} from "typeorm";

export class GameCreateTable1545045732556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `game` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `game`");
    }

}
