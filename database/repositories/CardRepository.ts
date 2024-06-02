import { Repository } from 'typeorm';
import { CardEntity } from '../entities/CardEntity';
import { AppDataSource } from '../connection';

export class CardRepository {
  private repository: Repository<CardEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CardEntity);
  }

  async getAllCards(): Promise<CardEntity[]> {
    return this.repository.find();
  }

  async getCardById(id: number): Promise<CardEntity | null> {
    return this.repository.findOne({ where: { id: id } });
  }

  async createCard(card: Partial<CardEntity>): Promise<CardEntity> {
    const newCard = this.repository.create(card);
    return this.repository.save(newCard);
  }

  async updateCard(id: number, updateData: Partial<CardEntity>): Promise<void> {
    await this.repository.update(id, updateData);
  }

  async deleteCard(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAllCards() {
    await this.repository.clear();
  }

  async getCardsByCategoryId(id: number) {
    return this.repository.find({ where: { category: { id: id } } });
  }
}
