// database/repositories/CategoryRepository.ts
import { AppDataSource } from '../connection';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/CategoryEntity';

export class CategoryRepository {
  private repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryEntity);
  }

  /**
   * 카테고리 조회
   * @param id
   */
  async getCategoryById(id: number): Promise<CategoryEntity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  /**
   * 카테고리 생성
   * @param category
   */
  async createCategory(
    category: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const newCategory = this.repository.create(category);
    return this.repository.save(newCategory);
  }

  /**
   * 카테고리 수정
   * @param id
   * @param category
   */
  async updateCategory(
    id: number,
    category: Partial<CategoryEntity>,
  ): Promise<CategoryEntity | null> {
    await this.repository.update(id, category);
    return this.repository.findOne({
      where: { id },
    });
  }

  /**
   * 전체 카테고리 조회
   * @returns 카테고리 목록
   */
  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  /**
   * 카테고리 전체 삭제
   */
  async clearCategories() {
    await this.repository.clear();
  }
}
