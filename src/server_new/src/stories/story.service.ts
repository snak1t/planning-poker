import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './create-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  async all(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  async create(createStoryDto: CreateStoryDto) {
    const { gameId, ...storyData } = createStoryDto;
    const story = this.storyRepository.create(storyData);
    return await this.storyRepository.save(this.setRelation(story, gameId));
  }

  setRelation(story: Story, id: number): Story {
    story.game = { id } as any;
    return story;
  }
}
