import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CardEntity {
  @PrimaryGeneratedColumn()
  uid: number = 0;

  @Column({ name: 'card_name', type: 'text' })
  card_name: string = '';

  @Column({ name: 'category_uid', type: 'int' })
  category_uid: number = 0;

  @Column({ name: 'card_image', type: 'blob', nullable: true })
  card_image: Blob | null = null;

  @Column({ name: 'bookmarked', type: 'int' })
  bookmarked: number = 0;
}
