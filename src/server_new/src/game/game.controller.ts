import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Game } from './game.entity';
import { CreateGameDto } from './create-game.dto';
import { GamesService } from './game.service';

@Controller('game')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.all();
  }

  @Get(':id')
  async find(@Param('id') id) {
    return this.gameService.find(id, { relations: ['stories'] });
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      return await this.gameService.save(createGameDto);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
