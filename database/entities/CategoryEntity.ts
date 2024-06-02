import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_icon', type: 'text', nullable: true })
  icon: string = '';

  @Column({ name: 'category_name', type: 'text' })
  name: string = '';

  @OneToMany(() => CardEntity, card => card.category)
  cards: CardEntity[];
}
