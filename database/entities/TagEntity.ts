import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tag_text', type: 'text' })
  text: string = '';

  @ManyToMany(() => CardEntity, card => card.tags)
  cards: CardEntity[];
}
