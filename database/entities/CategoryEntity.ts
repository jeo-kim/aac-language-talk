import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_icon', type: 'text', nullable: true })
  icon: string = '';

  @Column({ name: 'category_name', type: 'text' })
  name: string = '';

  @ManyToMany(() => CardEntity, card => card.categories)
  cards: CardEntity[];
}
