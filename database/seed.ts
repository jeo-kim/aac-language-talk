import { CategoryRepository } from './repositories/CategoryRepository';
import { CardRepository } from './repositories/CardRepository';
import { TagRepository } from './repositories/TagRepository';

export const seedDatabase = async () => {
  const categoryRepo = new CategoryRepository();
  const cardRepo = new CardRepository();
  const tagRepo = new TagRepository();

  const categories = [
    { icon: '', name: '카테고리 1' },
    { icon: '', name: '카테고리 2' },
  ];

  const tags = [{ text: '태그 1' }, { text: '태그 2' }];

  const cards = [
    { name: '카드 1', categories: [categories[0]], tags: [tags[0]] },
    { name: '카드 2', categories: [categories[0]], tags: [tags[0], tags[1]] },
    { name: '카드 3', categories: [categories[0]], tags: [tags[1]] },
    { name: '카드 4', categories: [categories[0]], tags: [] },
    { name: '카드 5', categories: [categories[1]], tags: [tags[0]] },
    { name: '카드 6', categories: [categories[1]], tags: [tags[1]] },
    { name: '카드 7', categories: [categories[1]], tags: [tags[0], tags[1]] },
    { name: '카드 8', categories: [categories[1]], tags: [] },
  ];

  try {
    // 카드 데이터를 먼저 삭제
    await cardRepo.deleteAllCards();

    // 그 다음 카테고리 데이터를 삭제
    await categoryRepo.clearCategories();

    // 태그 데이터를 삭제
    await tagRepo.deleteAllTags();

    // 카테고리 데이터 삽입
    let savedCategories: any[];
    savedCategories = [];
    for (const category of categories) {
      const newCategory = await categoryRepo.createCategory(category);
      savedCategories.push(newCategory);
    }

    // 태그 데이터 삽입
    let savedTags: any[];
    savedTags = [];
    for (const tag of tags) {
      const newTag = await tagRepo.createTag(tag);
      savedTags.push(newTag);
    }

    // 카드 데이터 삽입
    for (const card of cards) {
      const categoryIds = card.categories
        .map(cat => {
          const savedCategory = savedCategories.find(
            savedCat => savedCat.name === cat.name,
          );
          return savedCategory ? savedCategory.id : null;
        })
        .filter(id => id !== null);

      const tagIds = card.tags
        .map(tag => {
          const savedTag = savedTags.find(
            savedTag => savedTag.text === tag.text,
          );
          return savedTag ? savedTag.id : null;
        })
        .filter(id => id !== null);

      await cardRepo.createCard({ name: card.name }, categoryIds, tagIds);
    }

    console.log('Database seeded successfully!');

    // 데이터 삽입 후 모든 카테고리를 가져와서 출력
    const allCategories = await categoryRepo.getAllCategories();
    const allCards = await cardRepo.getAllCards();
    console.log('All Categories:', allCategories);
    console.log('All Cards:', allCards);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
