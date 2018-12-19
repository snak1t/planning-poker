import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './game/game.module';
import { StoryModule } from './stories/story.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GamesModule, StoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
