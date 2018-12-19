import { Controller, Get, All, Post, Body } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './create-story.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}
  @Get()
  all() {
    return this.storyService.all();
  }

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }
}
