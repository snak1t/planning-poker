import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Game } from '../game/game.entity';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @Column('text')
  description: string;

  @ManyToOne(type => Game, game => game.stories)
  @JoinColumn({ name: 'gameId' })
  game: Game;
}
