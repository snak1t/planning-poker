import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
