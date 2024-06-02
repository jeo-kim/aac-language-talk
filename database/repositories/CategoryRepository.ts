// database/repositories/CategoryRepository.ts
import { AppDataSource } from '../connection';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/CategoryEntity';

export class CategoryRepository {
  private repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryEntity);
  }

  async createCategory(
    category: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const newCategory = this.repository.create(category);
    return this.repository.save(newCategory);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  async clearCategories() {
    await this.repository.clear();
  }
}
