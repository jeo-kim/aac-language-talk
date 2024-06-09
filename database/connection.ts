// database/database.ts
import { DataSource } from 'typeorm';
import { CardEntity } from './entities/CardEntity';
import { CategoryEntity } from './entities/CategoryEntity';
import { TagEntity } from './entities/TagEntity';

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'myDatabase.db',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  synchronize: true,
  entities: [CardEntity, CategoryEntity, TagEntity],
});

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
    }
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
};
