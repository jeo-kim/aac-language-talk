import {
  Entity,
  PrimaryGeneratedColumn,
  // Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CardEntity } from './CardEntity';

@Entity()
export class SentenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // todo: 문장 텍스트를 별도로 가져야 할지? 아니면 그냥 각 카드의 name 속성을 사용할지?
  // @Column({ type: 'text' })
  // text: string;

  @ManyToMany(() => CardEntity, card => card.sentences)
  @JoinTable({
    name: 'sentence_card',
    joinColumn: { name: 'sentenceId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cardId', referencedColumnName: 'id' },
  })
  cards: CardEntity[];
}
