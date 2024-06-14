// database/repositories/TagRepository.ts
import { AppDataSource } from '../connection';
import { Repository } from 'typeorm';
import { TagEntity } from '../entities/TagEntity';

export class TagRepository {
  private repository: Repository<TagEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(TagEntity);
  }

  /**
   * tag 생성
   * @param Tag
   */
  async createTag(tag: Partial<TagEntity>): Promise<TagEntity> {
    const newTag = this.repository.create(tag);
    return this.repository.save(newTag);
  }

  /**
   * tag 전체 삭제
   */
  async deleteAllTags() {
    await this.repository.clear();
  }
}
