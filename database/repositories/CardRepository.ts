import { Repository, In } from 'typeorm';
import { CardEntity } from '../entities/CardEntity';
import { CategoryEntity } from '../entities/CategoryEntity';
import { TagEntity } from '../entities/TagEntity';
import { AppDataSource } from '../connection';

export class CardRepository {
  private repository: Repository<CardEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CardEntity);
  }

  async getAllCards(): Promise<CardEntity[]> {
    return this.repository.find({
      relations: ['categories', 'tags'],
    });
  }

  async getCardById(id: number): Promise<CardEntity | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['categories', 'tags'],
    });
  }

  // /**
  //  * 카드 생성
  //  * @param card
  //  */
  // async createCard(
  //   card: Partial<CardEntity>,
  //   categoryIds: number[],
  //   tagIds: number[],
  // ): Promise<CardEntity> {
  //   const categories = await AppDataSource.getRepository(CategoryEntity).findBy(
  //     { id: In(categoryIds) },
  //   );
  //   const tags = await AppDataSource.getRepository(TagEntity).findBy({
  //     id: In(tagIds),
  //   });
  //
  //   const newCard = this.repository.create({
  //     ...card,
  //     categories,
  //     tags,
  //   });
  //
  //   return this.repository.save(newCard);
  // }

  /**
   * 카드 생성
   * @param card
   * @param categoryIds
   * @param tagNames
   */
  async createCard(
    card: Partial<CardEntity>,
    categoryIds: number[],
    tagNames: string[],
  ): Promise<CardEntity> {
    const categoryRepo = AppDataSource.getRepository(CategoryEntity);
    const tagRepo = AppDataSource.getRepository(TagEntity);

    const categories = await categoryRepo.findBy({ id: In(categoryIds) });

    const tags = await Promise.all(
      tagNames.map(async text => {
        let tag = await tagRepo.findOneBy({ text });
        if (!tag) {
          tag = tagRepo.create({ text });
          await tagRepo.save(tag);
        }
        return tag;
      }),
    );

    const newCard = this.repository.create({
      ...card,
      categories,
      tags,
    });

    return this.repository.save(newCard);
  }

  /**
   * 카드 수정
   * @param id
   * @param updateData: Partial<CardEntity>
   * @param categoryIds
   * @param tagIds
   */
  async updateCard(
    id: number,
    updateData: Partial<CardEntity>,
    categoryIds?: number[],
    tagIds?: number[],
  ): Promise<void> {
    const card = await this.repository.findOne({
      where: { id },
      relations: ['categories', 'tags'],
    });

    if (!card) {
      throw new Error('Card not found');
    }

    if (categoryIds) {
      const categories = await AppDataSource.getRepository(
        CategoryEntity,
      ).findBy({ id: In(categoryIds) });
      card.categories = categories;
    }

    if (tagIds) {
      const tags = await AppDataSource.getRepository(TagEntity).findBy({
        id: In(tagIds),
      });
      card.tags = tags;
    }

    Object.assign(card, updateData);

    await this.repository.save(card);
  }

  /**
   * 카드 북마크 값 수정
   * @param id
   * @param bookmarked
   */
  async updateBookmarked(id: number, bookmarked: number): Promise<void> {
    const card = await this.repository.findOne({
      where: { id },
    });

    if (!card) {
      throw new Error('Card not found');
    }

    card.bookmarked = bookmarked;

    await this.repository.save(card);
  }

  async deleteCard(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAllCards() {
    await this.repository.clear();
  }

  /**
   * 카테고리 ID로 카드 리스트 조회
   * @param categoryId
   */
  async getCardsByCategoryId(categoryId: number): Promise<CardEntity[]> {
    const category = await AppDataSource.getRepository(CategoryEntity).findOne({
      where: { id: categoryId },
      relations: ['cards'],
    });

    if (!category) {
      return [];
    }

    return category.cards;
  }
}
