import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './CategoryEntity';

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'card_name', type: 'text' })
  card_name: string = '';

  @ManyToOne(() => CategoryEntity, category => category.cards)
  category: CategoryEntity;

  @Column({ name: 'card_image', type: 'text', nullable: true })
  image: string = '';

  @Column({ name: 'bookmarked', type: 'int' })
  bookmarked: number = 0;
}
