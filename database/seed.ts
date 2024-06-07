import { CategoryRepository } from './repositories/CategoryRepository';
import { CardRepository } from './repositories/CardRepository';

export const seedDatabase = async () => {
  const categoryRepo = new CategoryRepository();
  const cardRepo = new CardRepository();

  const categories = [
    { icon: '', name: '기본 카테고리 5' },
    { icon: '', name: '기본 카테고리 6' },
  ];

  const cards = [
    { name: '카드 1', category: categories[0] },
    { name: '카드 2', category: categories[0] },
    { name: '카드 3', category: categories[0] },
    { name: '카드 4', category: categories[0] },
    { name: '카드 1', category: categories[1] },
    { name: '카드 2', category: categories[1] },
    { name: '카드 3', category: categories[1] },
    { name: '카드 4', category: categories[1] },
  ];

  try {
    // 카드 데이터를 먼저 삭제
    await cardRepo.deleteAllCards();

    // 그 다음 카테고리 데이터를 삭제
    await categoryRepo.clearCategories();

    // 카테고리 데이터 삽입
    const savedCategories = [];
    for (const category of categories) {
      const newCategory = await categoryRepo.createCategory(category);
      console.log({ newCategory });
      savedCategories.push(newCategory);
    }

    // 카드 데이터 삽입
    for (const card of cards) {
      const category = savedCategories.find(
        cat => cat.name === card.category.name,
      );
      if (category) {
        await cardRepo.createCard({ ...card, category });
        // await cardRepo.(newCard);
      }
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
