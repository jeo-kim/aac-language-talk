// src/database/repositories/CardRepository.ts
import { getRepository, Repository } from 'typeorm';
import { CardEntity } from '../entities/CardEntity';

export class CardRepository {
  private repository: Repository<CardEntity>;

  constructor() {
    this.repository = getRepository(CardEntity);
  }

  async getAllCards(): Promise<CardEntity[]> {
    return this.repository.find();
  }

  async getCardById(id: number): Promise<CardEntity | null> {
    return this.repository.findOne({ where: { uid: id } });
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
}
