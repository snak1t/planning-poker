import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GamesController } from './game.controller';
import { GamesService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
