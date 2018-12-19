import {MigrationInterface, QueryRunner} from "typeorm";

export class StoryCreateTable1545047174454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `story` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` text NOT NULL, `gameId` int NULL, UNIQUE INDEX `IDX_652b018f49a71d11bf3660910e` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `story` ADD CONSTRAINT `FK_bce4f43a9d6af657307f3051dee` FOREIGN KEY (`gameId`) REFERENCES `game`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `story` DROP FOREIGN KEY `FK_bce4f43a9d6af657307f3051dee`");
        await queryRunner.query("DROP INDEX `IDX_652b018f49a71d11bf3660910e` ON `story`");
        await queryRunner.query("DROP TABLE `story`");
    }

}
