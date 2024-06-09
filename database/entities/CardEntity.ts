import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { TagEntity } from './TagEntity';

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'card_name', type: 'text' })
  name: string = '';

  @Column({ name: 'card_image', type: 'text', nullable: true })
  image: string = '';

  @Column({ name: 'bookmarked', type: 'int' })
  bookmarked: number = 0;

  @ManyToMany(() => CategoryEntity, category => category.cards)
  @JoinTable({
    name: 'category_card',
    joinColumn: { name: 'cardId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, tag => tag.cards)
  @JoinTable({
    name: 'card_tag',
    joinColumn: { name: 'cardId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: TagEntity[];
}
